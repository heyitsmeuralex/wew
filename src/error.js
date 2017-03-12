const error = {
  ILLEGAL_CHARACTER:  err => `Mistake: illegal character ${err.char}`,
  UNEXPECTED_TOKEN:   err => `Mistake: unexpected token ${err.token.type}`,
  UNEXPECTED_KEYWORD: err => `Mistake: unexpected keyword ${err.token.src}`,
}

function format(error) {
  try {
    console.error(error.type(error), 'on line', error.line, 'column', error.col)
  } catch(e) {
    console.error(error)
  }
}

module.exports = error
module.exports.format = format
