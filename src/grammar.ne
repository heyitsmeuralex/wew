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
List[X, Y] -> ($X $Y):* $X {% d => [...d[0].map(([x, y]) => x), d[1]] %}

# Program structure
Program   -> _ List[Statement, __] _  {% d => ['program', d[1]] %}
           | _ {% d => [] %}

Statement -> ImportStatement {% d => d[0] %}
  | Expression {% d => ['expression', d[0]] %}

# Statement types
ImportStatement ->
    %k_import __ List[%t_identifier, _ %t_comma _] __ %k_from __ %t_identifier
    {% d => [ 'import', d[6], d[2] ] %}
  | %k_import __ %t_asterisk __ %k_from __ %t_identifier
    {% d => [ 'import', d[6], '*' ] %}
  | %k_import __ %t_identifier
    {% d => [ 'import', d[2] ] %}

Expression -> Identifier {% d => d[0] %}

# Identifier (incl. properties)
Identifier -> List[%t_identifier, %t_dot] {% d => ['identifier', d[0].map(y => y[0])] %}

# Whitespace matching
_   -> %t_whitespace:* {% d => null %}
__  -> %t_whitespace:+ {% d => null %}
