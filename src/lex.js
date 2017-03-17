const tokenizer2 = require('tokenizer2')
const error = require('./error')

const rules = {
  multiline_comment: /^#{[^}]*}$/,
  comment: /^#[^{][^\n]*$/,

  newline: /^\n$/,
  semicolon: /^;$/,
  whitespace: /^[^\S\n]+$/, // except newlines

  keyword: /^(import|from|if|then|else|true|false|and|or|not)$/,

  pipe_fwd: /^\|>$/,
  pipe_bkd: /^<\|$/,

  open_paren: /^\($/,
  close_paren: /^\)$/,

  asterisk: /^\*$/,
  plus: /^\+$/,
  minus: /^\-$/,
  slash: /^\/$/,

  comma: /^,$/,
  dot: /^\.$/,
  dotdot: /^\.\.$/,
  caret: /^\^$/,
  backslash: /^\\$/,

  dq_string: /^"([^\\"\n]|\\.)*"$/,
  sq_string: /^'([^\\'\n]|\\.)*'$/,
  bq_string: /^`([^\\`]|\\.)*`$/m,

  int: /^[0-9]+$/,

  identifier: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
}

const ignoredRules = [
  'comment', 'multiline_comment',
]

const keywords = [
  'import', 'from',
  'if', 'then', 'else',
  'true', 'false',
  'and', 'or', 'not',
]

const openBrackets = [
  'open_paren'
]

const closeBrackets = [
  'close_paren'
]

function removeNewlinesInBrackets(toks) {
  /*
    Converts something like
      [ 'newline', 'open_paren', 'newline', 'close_paren' ]
    to
      [ 'newline', 'open_paren', 'whitespace', 'close_paren' ]
                                  ^^^^^^^^^^
  */

  let brackets = 0
  let res = []

  for (let tok of toks) {
    const { type } = tok

    if (type === 'newline' && brackets > 0) {
      tok.type = 'whitespace'
      res.push(tok)

      continue
    }

    if (type === 'semicolon') {
      tok.type = 'newline'
      res.push(tok)

      continue
    }

    if (openBrackets.includes(type))
      brackets++

    if (closeBrackets.includes(type))
      brackets--

    res.push(tok)
  }

  return res
}

module.exports = inputStream => new Promise((resolve, reject) => {
  let tokenStream = tokenizer2()
  let res = []

  // Add some rules
  for (let name in rules)
    tokenStream.addRule(rules[name], name)

  // Callbacks:

  tokenStream.on('data', tok => {
    if (!ignoredRules.includes(tok.type))
      res.push(tok)
  })

  tokenStream.on('error', e => {
    const { line, col, buffer } = e.tokenizer2
    const char = buffer[0]

    reject({
      type: error.ILLEGAL_CHARACTER,
      char,
      line, col,
    })
  })

  tokenStream.on('end', () => {
    resolve(removeNewlinesInBrackets(res))
  })

  // Tokenize!
  inputStream.pipe(tokenStream)
})

module.exports.rules = rules
module.exports.keywords = keywords
