const types = {}

types.Boolean = class {
  constructor(value) {
    this.value = value
    this.type = 'Boolean'
  }
}

types.String = class {
  constructor(value) {
    this.value = value
    this.type = 'String'
  }
}

const Big = require('big.js') // because the native JS Number is bork
types.Number = class extends Big {
  constructor(value) {
    super(value)
    this.type = 'Number'
  }

  get value() {
    return this.toString()
  }
}

module.exports = types
