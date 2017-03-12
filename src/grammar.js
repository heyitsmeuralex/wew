// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }


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

var grammar = {
    ParserRules: [
    {"name": "Program$macrocall$2", "symbols": ["Statement"]},
    {"name": "Program$macrocall$3", "symbols": ["__"]},
    {"name": "Program$macrocall$1$ebnf$1", "symbols": []},
    {"name": "Program$macrocall$1$ebnf$1$subexpression$1", "symbols": ["Program$macrocall$2", "Program$macrocall$3"]},
    {"name": "Program$macrocall$1$ebnf$1", "symbols": ["Program$macrocall$1$ebnf$1", "Program$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Program$macrocall$1", "symbols": ["Program$macrocall$1$ebnf$1", "Program$macrocall$2"], "postprocess": d => [...d[0].map(([x, y]) => x), d[1]]},
    {"name": "Program", "symbols": ["_", "Program$macrocall$1", "_"], "postprocess": d => ['program', d[1]]},
    {"name": "Program", "symbols": ["_"], "postprocess": d => []},
    {"name": "Statement", "symbols": ["ImportStatement"], "postprocess": d => d[0]},
    {"name": "Statement", "symbols": ["Expression"], "postprocess": d => ['expression', d[0]]},
    {"name": "ImportStatement$macrocall$2", "symbols": [t_identifier]},
    {"name": "ImportStatement$macrocall$3", "symbols": ["_", t_comma, "_"]},
    {"name": "ImportStatement$macrocall$1$ebnf$1", "symbols": []},
    {"name": "ImportStatement$macrocall$1$ebnf$1$subexpression$1", "symbols": ["ImportStatement$macrocall$2", "ImportStatement$macrocall$3"]},
    {"name": "ImportStatement$macrocall$1$ebnf$1", "symbols": ["ImportStatement$macrocall$1$ebnf$1", "ImportStatement$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ImportStatement$macrocall$1", "symbols": ["ImportStatement$macrocall$1$ebnf$1", "ImportStatement$macrocall$2"], "postprocess": d => [...d[0].map(([x, y]) => x), d[1]]},
    {"name": "ImportStatement", "symbols": [k_import, "__", "ImportStatement$macrocall$1", "__", k_from, "__", t_identifier], "postprocess": d => [ 'import', d[6], d[2] ]},
    {"name": "ImportStatement", "symbols": [k_import, "__", t_asterisk, "__", k_from, "__", t_identifier], "postprocess": d => [ 'import', d[6], '*' ]},
    {"name": "ImportStatement", "symbols": [k_import, "__", t_identifier], "postprocess": d => [ 'import', d[2] ]},
    {"name": "Expression", "symbols": ["Identifier"], "postprocess": d => d[0]},
    {"name": "Identifier$macrocall$2", "symbols": [t_identifier]},
    {"name": "Identifier$macrocall$3", "symbols": [t_dot]},
    {"name": "Identifier$macrocall$1$ebnf$1", "symbols": []},
    {"name": "Identifier$macrocall$1$ebnf$1$subexpression$1", "symbols": ["Identifier$macrocall$2", "Identifier$macrocall$3"]},
    {"name": "Identifier$macrocall$1$ebnf$1", "symbols": ["Identifier$macrocall$1$ebnf$1", "Identifier$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Identifier$macrocall$1", "symbols": ["Identifier$macrocall$1$ebnf$1", "Identifier$macrocall$2"], "postprocess": d => [...d[0].map(([x, y]) => x), d[1]]},
    {"name": "Identifier", "symbols": ["Identifier$macrocall$1"], "postprocess": d => ['identifier', d[0].map(y => y[0])]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", t_whitespace], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": d => null},
    {"name": "__$ebnf$1", "symbols": [t_whitespace]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", t_whitespace], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": d => null}
]
  , ParserStart: "Program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
