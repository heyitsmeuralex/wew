const tokenizer2 = require('tokenizer2')
const error = require('./error')

const rules = {
  comment: /^#[^\n]*$/,
  whitespace: /^[\s]+$/,

  keyword: /^(import|from)$/,

  open_paren: /^\($/,
  close_paren: /^\)$/,

  comma: /^,$/,
  asterisk: /^\*$/,
  dot: /^\.$/,

  dq_string: /^"([^\\"]|\\.)*"$/,
  sq_string: /^'([^\\']|\\.)*'$/,

  identifier: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
}

const ignoredRules = [
  'comment',
]

const keywords = [
  'import', 'from',
]

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
    resolve(res)
  })

  // Tokenize!
  inputStream.pipe(tokenStream)
})

module.exports.rules = rules
module.exports.keywords = keywords
