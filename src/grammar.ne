@{%

const { rules, keywords } = require('./lex')

const t = Object.keys(rules).map(type => ({
  name: type,
  test: x => x.type === type
}))

const k = keywords.map(k => ({
  name: k,
  test: x => x.type === 'keyword' && x.src === k
}))

let T = {}
for (let tok of t)
  T['t_' + tok.name] = tok

let K = {}
for (let tok of k)
  K['k_' + tok.name] = tok

Object.assign(global, T, K)

%}

# Macros
List[X, Y] -> ($X $Y):* $X {% d => [...d[0].map(([x, y]) => x[0]), d[1][0]] %}
List2[X, Y] -> ($X $Y):* $X {% d => [...d[0].map(([x, y]) => x), d[1]]%}

ListBack2[X, Y] -> ($X $Y):+ {% d => d[0].map(([x, y]) => y) %}

# Program structure
Program   -> _ List[Statement, _ %t_newline _] _
           {% d => ['program', d[1].filter(n => n != null)] %}
           | _ {% d => [] %}

Statement -> ImportStatement {% d => d[0] %}
  | AssignStatement          {% d => d[0] %}
  | null       {% d => null %}
  | Expression {% d => ['expression', d[0]] %}

ImportStatement ->
    %k_import __ List[%t_identifier, _ %t_comma _] __ %k_from __ Identifier
    {% d => [ 'import', d[6], d[2] ] %}
  | %k_import __ %t_asterisk __ %k_from __ Identifier
    {% d => [ 'import', d[6], '*' ] %}
  | %k_import __ Identifier
    {% d => [ 'import', d[2] ] %}

AssignStatement ->
  %t_identifier _ %t_equals _ Expression
  {% d => ['assign', d[0], d[4]] %}

# Function definition
FunctionDef ->
  (
      %t_identifier:? _ %t_open_paren _ (
        List[%t_identifier, _ %t_comma _] {% d => d[0] %}
        | null {% d => [] %}
      ) _ %t_close_paren {% d => [ d[0], d[4] ] %}
    | %t_identifier __ %t_identifier {% d => [ d[0], [ d[2] ] ] %}
    | %t_identifier {% d => [ null, [ d[0] ] ] %}
  ):? _ %t_fat_arrow _ Expression {% ([ [ name, args ], ,,, body ]) =>
    [ name, args, body ]
  %}

# PEMDAS / BIDMAS:
Expression -> F           {% d => d[0] %}

# Function definition
F -> FunctionDef                         {% d => ['fn', ...d[0]] %}
   | P {% d => d[0] %}

# Pipe operators (|>, <\)
P -> K                    {% d => d[0] %}
   | P _ %t_pipe_fwd _ P  {% d => ['function_call', d[4], [d[0]], d[2]] %}
   | P _ %t_pipe_bkd _ P  {% d => ['function_call', d[0], [d[4]], d[2]] %}

# Logical/1 operators (not)
K -> %k_not __ K          {% d => ['not', d[2]] %}
   | L                    {% d => d[0] %}

# Logical/2 operators (and, or)
L -> Expression __ %k_and __ Expression {% d => ['and', d[0], d[4]] %}
   | Expression __ %k_or __ Expression  {% d => ['or', d[0], d[4]] %}
   | AS                                 {% d => d[0] %}

# Parentheses / Brackets
B  -> %t_open_paren _ AS _ %t_close_paren {% d => d[2] %}
    | %t_open_paren _ %t_close_paren      {% d => null %}
    | FunctionCall                        {% d => d[0] %}
    | Literal                             {% d => d[0] %}
    | IfConditional                       {% d => d[0] %}
    | MatchConditional                    {% d => d[0] %}

# Exponents / Indicies
I  -> B _ %t_caret _ I {% d => ['pow', d[0], d[4], d[2]] %}
    | B                {% d => d[0] %}

# Multiplication & Divison
MD -> MD _ %t_asterisk _ I {% d => ['mul', d[0], d[4], d[2]] %}
    | MD _ %t_slash    _ I {% d => ['div', d[0], d[4], d[2]] %}
    | I                    {% d => d[0] %}

# Addition & Subtraction
AS -> AS _ %t_plus   _ MD {% d => ['add', d[0], d[4], d[2]] %}
    | AS _ %t_minus  _ MD {% d => ['min', d[0], d[4], d[2]] %}
    | AS _ %t_dotdot _ MD {% d => ['cat', d[0], d[4], d[2]] %}
    | MD                  {% d => d[0] %}
    | %t_minus MD
  {% d => ['min',
            ['number', '0', d[0]],
            d[1],
            d[0]
          ] %}

Literal -> Identifier                     {% d => d[0] %}
    | Number                              {% d => d[0] %}
    | String                              {% d => d[0] %}
    | Bool                                {% d => d[0] %}
    | Map                                 {% d => d[0] %}

# Number literals
Number -> Int                    {% d => ['number', d[0][0], d[0][1]] %}
        | Float                  {% d => ['number', d[0][0], d[0][1]] %}
Float  -> %t_int %t_dot %t_int
  {% d => [ d[0].src + '.' + d[2].src, d[0] ] %}
        | %t_dot %t_int          {% d => [ '0.' + d[1].src, d[0] ] %}
Int    -> %t_int                 {% d => [ d[0].src, d[0] ] %}

# String literals
String -> (%t_dq_string | %t_sq_string | %t_bq_string)
  {% d => ['string', d[0][0].src.substr(1, d[0][0].src.length-2), d[0][0]] %}

# Boolean literals
Bool -> %k_true  {% d => ['bool', true] %}
      | %k_false {% d => ['bool', false] %}

# Map literal
Map -> %t_open_square _ MapContents:? _ %t_close_square
    {% d => ['map', d[2] || []] %}
MapContents -> List2[%t_identifier _ %t_arrow _ Expression, _ %t_comma _]
            {% d => d[0].map(d => [ d[0], d[4] ]) %}

# Function invocation
FunctionCall -> Identifier _ %t_open_paren _ ArgumentList _ %t_close_paren
  {% d => ['function_call', d[0], d[4], d[2]] %}
ArgumentList -> List[Expression, _ %t_comma _] {% d => d[0] %}
              | null                           {% d => [] %}

# Conditionals

IfConditional ->
  %k_if nn Expression nn %k_then nn Expression nn %k_else nn Expression
  {% d => ['if_conditional', d[2], d[6], d[10], d[0]] %}

MatchConditional ->
  %k_match nn Expression nn %k_where nn MatchConditionalContents
  {% d => ['match_conditional', d[2], d[6], d[0]] %}
MatchConditionalContents ->
  ListBack2[n %t_pipe n, Literal _ %t_arrow _ Expression]
  {% d => d[0].map(d => [ d[2], d[6] ]) %}

# Identifier (incl. properties)
Identifier -> List[%t_identifier, %t_dot] {% d => ['identifier', d[0]] %}

# Whitespace matching
_   -> %t_whitespace:* {% d => null %}
__  -> %t_whitespace:+ {% d => null %}

n   -> (%t_whitespace | %t_newline):* {% d => null %}
nn  -> (%t_whitespace | %t_newline):+ {% d => null %}
