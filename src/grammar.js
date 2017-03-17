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
    {"name": "Program$macrocall$3", "symbols": ["_", t_newline, "_"]},
    {"name": "Program$macrocall$1$ebnf$1", "symbols": []},
    {"name": "Program$macrocall$1$ebnf$1$subexpression$1", "symbols": ["Program$macrocall$2", "Program$macrocall$3"]},
    {"name": "Program$macrocall$1$ebnf$1", "symbols": ["Program$macrocall$1$ebnf$1", "Program$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Program$macrocall$1", "symbols": ["Program$macrocall$1$ebnf$1", "Program$macrocall$2"], "postprocess": d => [...d[0].map(([x, y]) => x[0]), d[1][0]]},
    {"name": "Program", "symbols": ["_", "Program$macrocall$1", "_"], "postprocess": d => ['program', d[1].filter(n => n != null)]},
    {"name": "Program", "symbols": ["_"], "postprocess": d => []},
    {"name": "Statement", "symbols": ["ImportStatement"], "postprocess": d => d[0]},
    {"name": "Statement", "symbols": [], "postprocess": d => null},
    {"name": "Statement", "symbols": ["Expression"], "postprocess": d => ['expression', d[0]]},
    {"name": "ImportStatement$macrocall$2", "symbols": [t_identifier]},
    {"name": "ImportStatement$macrocall$3", "symbols": ["_", t_comma, "_"]},
    {"name": "ImportStatement$macrocall$1$ebnf$1", "symbols": []},
    {"name": "ImportStatement$macrocall$1$ebnf$1$subexpression$1", "symbols": ["ImportStatement$macrocall$2", "ImportStatement$macrocall$3"]},
    {"name": "ImportStatement$macrocall$1$ebnf$1", "symbols": ["ImportStatement$macrocall$1$ebnf$1", "ImportStatement$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ImportStatement$macrocall$1", "symbols": ["ImportStatement$macrocall$1$ebnf$1", "ImportStatement$macrocall$2"], "postprocess": d => [...d[0].map(([x, y]) => x[0]), d[1][0]]},
    {"name": "ImportStatement", "symbols": [k_import, "__", "ImportStatement$macrocall$1", "__", k_from, "__", "Identifier"], "postprocess": d => [ 'import', d[6], d[2] ]},
    {"name": "ImportStatement", "symbols": [k_import, "__", t_asterisk, "__", k_from, "__", "Identifier"], "postprocess": d => [ 'import', d[6], '*' ]},
    {"name": "ImportStatement", "symbols": [k_import, "__", "Identifier"], "postprocess": d => [ 'import', d[2] ]},
    {"name": "FunctionDef$ebnf$1$subexpression$1$ebnf$1", "symbols": [t_identifier], "postprocess": id},
    {"name": "FunctionDef$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$2", "symbols": [t_identifier]},
    {"name": "FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$3", "symbols": ["_", t_comma, "_"]},
    {"name": "FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$1$ebnf$1", "symbols": []},
    {"name": "FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$1$ebnf$1$subexpression$1", "symbols": ["FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$2", "FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$3"]},
    {"name": "FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$1$ebnf$1", "symbols": ["FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$1$ebnf$1", "FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$1", "symbols": ["FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$1$ebnf$1", "FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$2"], "postprocess": d => [...d[0].map(([x, y]) => x[0]), d[1][0]]},
    {"name": "FunctionDef$ebnf$1$subexpression$1$subexpression$1", "symbols": ["FunctionDef$ebnf$1$subexpression$1$subexpression$1$macrocall$1"], "postprocess": d => d[0]},
    {"name": "FunctionDef$ebnf$1$subexpression$1$subexpression$1", "symbols": [], "postprocess": d => []},
    {"name": "FunctionDef$ebnf$1$subexpression$1", "symbols": ["FunctionDef$ebnf$1$subexpression$1$ebnf$1", "_", t_open_paren, "_", "FunctionDef$ebnf$1$subexpression$1$subexpression$1", "_", t_close_paren], "postprocess": d => [ d[0], d[4] ]},
    {"name": "FunctionDef$ebnf$1$subexpression$1", "symbols": [t_identifier, "__", t_identifier], "postprocess": d => [ d[0], [ d[2] ] ]},
    {"name": "FunctionDef$ebnf$1$subexpression$1", "symbols": [t_identifier], "postprocess": d => [ null, [ d[0] ] ]},
    {"name": "FunctionDef$ebnf$1", "symbols": ["FunctionDef$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "FunctionDef$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FunctionDef", "symbols": ["FunctionDef$ebnf$1", "_", t_arrow, "_", "Expression"], "postprocess":  ([ [ name, args ], ,,, body ]) =>
        [ name, args, body ]
          },
    {"name": "Expression", "symbols": ["F"], "postprocess": d => d[0]},
    {"name": "F", "symbols": ["FunctionDef"], "postprocess": d => ['fn', ...d[0]]},
    {"name": "F", "symbols": ["P"], "postprocess": d => d[0]},
    {"name": "P", "symbols": ["K"], "postprocess": d => d[0]},
    {"name": "P", "symbols": ["P", "_", t_pipe_fwd, "_", "P"], "postprocess": d => ['function_call', d[4], [d[0]], d[2]]},
    {"name": "P", "symbols": ["P", "_", t_pipe_bkd, "_", "P"], "postprocess": d => ['function_call', d[0], [d[4]], d[2]]},
    {"name": "K", "symbols": [k_not, "__", "K"], "postprocess": d => ['not', d[2]]},
    {"name": "K", "symbols": ["L"], "postprocess": d => d[0]},
    {"name": "L", "symbols": ["Expression", "__", k_and, "__", "Expression"], "postprocess": d => ['and', d[0], d[4]]},
    {"name": "L", "symbols": ["Expression", "__", k_or, "__", "Expression"], "postprocess": d => ['or', d[0], d[4]]},
    {"name": "L", "symbols": ["AS"], "postprocess": d => d[0]},
    {"name": "B", "symbols": [t_open_paren, "_", "AS", "_", t_close_paren], "postprocess": d => d[2]},
    {"name": "B", "symbols": [t_open_paren, "_", t_close_paren], "postprocess": d => null},
    {"name": "B", "symbols": ["FunctionCall"], "postprocess": d => d[0]},
    {"name": "B", "symbols": ["Identifier"], "postprocess": d => d[0]},
    {"name": "B", "symbols": ["Number"], "postprocess": d => d[0]},
    {"name": "B", "symbols": ["String"], "postprocess": d => d[0]},
    {"name": "B", "symbols": ["Bool"], "postprocess": d => d[0]},
    {"name": "B", "symbols": ["IfConditional"], "postprocess": d => d[0]},
    {"name": "I", "symbols": ["B", "_", t_caret, "_", "I"], "postprocess": d => ['pow', d[0], d[4], d[2]]},
    {"name": "I", "symbols": ["B"], "postprocess": d => d[0]},
    {"name": "MD", "symbols": ["MD", "_", t_asterisk, "_", "I"], "postprocess": d => ['mul', d[0], d[4], d[2]]},
    {"name": "MD", "symbols": ["MD", "_", t_slash, "_", "I"], "postprocess": d => ['div', d[0], d[4], d[2]]},
    {"name": "MD", "symbols": ["I"], "postprocess": d => d[0]},
    {"name": "AS", "symbols": ["AS", "_", t_plus, "_", "MD"], "postprocess": d => ['add', d[0], d[4], d[2]]},
    {"name": "AS", "symbols": ["AS", "_", t_minus, "_", "MD"], "postprocess": d => ['min', d[0], d[4], d[2]]},
    {"name": "AS", "symbols": ["AS", "_", t_dotdot, "_", "MD"], "postprocess": d => ['cat', d[0], d[4], d[2]]},
    {"name": "AS", "symbols": ["MD"], "postprocess": d => d[0]},
    {"name": "AS", "symbols": [t_minus, "MD"], "postprocess":  d => ['min',
          ['number', '0', d[0]],
          d[1],
          d[0]
        ] },
    {"name": "Number", "symbols": ["Int"], "postprocess": d => ['number', d[0][0], d[0][1]]},
    {"name": "Number", "symbols": ["Float"], "postprocess": d => ['number', d[0][0], d[0][1]]},
    {"name": "Float", "symbols": [t_int, t_dot, t_int], "postprocess": d => [ d[0].src + '.' + d[2].src, d[0] ]},
    {"name": "Float", "symbols": [t_dot, t_int], "postprocess": d => [ '0.' + d[1].src, d[0] ]},
    {"name": "Int", "symbols": [t_int], "postprocess": d => [ d[0].src, d[0] ]},
    {"name": "String$subexpression$1", "symbols": [t_dq_string]},
    {"name": "String$subexpression$1", "symbols": [t_sq_string]},
    {"name": "String$subexpression$1", "symbols": [t_bq_string]},
    {"name": "String", "symbols": ["String$subexpression$1"], "postprocess": d => ['string', d[0][0].src.substr(1, d[0][0].src.length-2), d[0][0]]},
    {"name": "Bool", "symbols": [k_true], "postprocess": d => ['bool', true]},
    {"name": "Bool", "symbols": [k_false], "postprocess": d => ['bool', false]},
    {"name": "FunctionCall", "symbols": ["Identifier", "_", t_open_paren, "_", "ArgumentList", "_", t_close_paren], "postprocess": d => ['function_call', d[0], d[4], d[2]]},
    {"name": "ArgumentList$macrocall$2", "symbols": ["Expression"]},
    {"name": "ArgumentList$macrocall$3", "symbols": ["_", t_comma, "_"]},
    {"name": "ArgumentList$macrocall$1$ebnf$1", "symbols": []},
    {"name": "ArgumentList$macrocall$1$ebnf$1$subexpression$1", "symbols": ["ArgumentList$macrocall$2", "ArgumentList$macrocall$3"]},
    {"name": "ArgumentList$macrocall$1$ebnf$1", "symbols": ["ArgumentList$macrocall$1$ebnf$1", "ArgumentList$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ArgumentList$macrocall$1", "symbols": ["ArgumentList$macrocall$1$ebnf$1", "ArgumentList$macrocall$2"], "postprocess": d => [...d[0].map(([x, y]) => x[0]), d[1][0]]},
    {"name": "ArgumentList", "symbols": ["ArgumentList$macrocall$1"], "postprocess": d => d[0]},
    {"name": "IfConditional", "symbols": [k_if, "__", "Expression", "__", k_then, "__", "Expression", "__", k_else, "__", "Expression"], "postprocess": d => ['if_conditional', d[2], d[6], d[10], d[0]]},
    {"name": "Identifier$macrocall$2", "symbols": [t_identifier]},
    {"name": "Identifier$macrocall$3", "symbols": [t_dot]},
    {"name": "Identifier$macrocall$1$ebnf$1", "symbols": []},
    {"name": "Identifier$macrocall$1$ebnf$1$subexpression$1", "symbols": ["Identifier$macrocall$2", "Identifier$macrocall$3"]},
    {"name": "Identifier$macrocall$1$ebnf$1", "symbols": ["Identifier$macrocall$1$ebnf$1", "Identifier$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Identifier$macrocall$1", "symbols": ["Identifier$macrocall$1$ebnf$1", "Identifier$macrocall$2"], "postprocess": d => [...d[0].map(([x, y]) => x[0]), d[1][0]]},
    {"name": "Identifier", "symbols": ["Identifier$macrocall$1"], "postprocess": d => ['identifier', d[0]]},
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
