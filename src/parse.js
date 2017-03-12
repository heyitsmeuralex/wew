const nearley = require('nearley')
const grammar = require('./grammar')
const error = require('./error')

module.exports = tokens => new Promise((resolve, reject) => {
  let p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

  try {
    // Parse `tokens`
    p.feed(tokens)
  } catch(e) {
    // XXX: Figure out which is the offending token
    let match = /^nearley: No possible parsings \(@([0-9]+):/.exec(e.message)
    
    if(!match)
      reject(e)
    
    let offending = tokens[match[1]]

    reject({
      type: offending.type === 'keyword'
        ? error.UNEXPECTED_KEYWORD
        : error.UNEXPECTED_TOKEN,
      token: offending,
      line: offending.line,
      col: offending.col,
    })
  }

  resolve(p.results)
})
