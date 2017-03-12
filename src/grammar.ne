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

# Program structure
Program   -> _ List[Statement, __] _  {% d => ['program', d[1]] %}
           | _ {% d => [] %}

Statement -> ImportStatement {% d => d[0] %}
  | Expression {% d => ['expression', d[0]] %}

# Statement types
ImportStatement ->
    %k_import __ List[%t_identifier, _ %t_comma _] __ %k_from __ Identifier
    {% d => [ 'import', d[6], d[2] ] %}
  | %k_import __ %t_asterisk __ %k_from __ Identifier
    {% d => [ 'import', d[6], '*' ] %}
  | %k_import __ Identifier
    {% d => [ 'import', d[2] ] %}

# PEMDAS / BIDMAS:
Expression -> AS {% d => d[0] %}

# Parentheses / Brackets
B  -> %t_open_paren _ AS _ %t_close_paren {% d => d[2] %}
    | FunctionCall                        {% d => d[0] %}
    | Number                              {% d => d[0] %}
    | String                              {% d => d[0] %}

# Exponents / Indicies
I  -> B _ %t_caret _ I {% d => ['pow', d[0], d[4], d[2]] %}
    | B                {% d => d[0] %}

# Multiplication & Divison
MD -> MD _ %t_asterisk _ I {% d => ['mul', d[0], d[4], d[2]] %}
    | MD _ %t_slash    _ I {% d => ['div', d[0], d[4], d[2]] %}
    | I                    {% d => d[0] %}

# Addition & Subtraction
AS -> AS _ %t_plus  _ MD {% d => ['add', d[0], d[4], d[2]] %}
    | AS _ %t_minus _ MD {% d => ['min', d[0], d[4], d[2]] %}
    | MD                 {% d => d[0] %}

# Number literals
Number -> Int                    {% d => ['number', d[0][0], d[0][1]] %}
        | Float                  {% d => ['number', d[0][0], d[0][1]] %}
        | %t_minus (Int | Float) {% d => ['number', d[1][0] * -1, d[1][1]] %}
Float  -> %t_int %t_dot %t_int
  {% d => [ Number(d[0].src + '.' + d[2].src), d[0] ] %}
        | %t_dot %t_int          {% d => [ Number('0.' + d[1].src), d[0] ] %}
Int    -> %t_int                 {% d => [ Number(d[0].src), d[0] ] %}

# String literals
String -> (%t_dq_string | %t_sq_string)
  {% d => ['string', d[0][0].src.substr(1, d[0][0].src.length-2), d[0][0]] %}

# Function invocation
FunctionCall -> Identifier _ %t_open_paren _ ArgumentList _ %t_close_paren
  {% d => ['function_call', d[0], d[4]] %}
ArgumentList -> List[Expression, _ %t_comma _] {% d => d[0] %}

# Identifier (incl. properties)
Identifier -> List[%t_identifier, %t_dot] {% d => ['identifier', d[0]] %}

# Whitespace matching
_   -> %t_whitespace:* {% d => null %}
__  -> %t_whitespace:+ {% d => null %}
