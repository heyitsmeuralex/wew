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

types.Function = class {
  constructor(fn, args, name) {
    this.fn = fn
    this.args = args
    this.name = name || ''
    this.type = 'Function'
  }

  get value() {
    const { name, args } = this

    let a = args.map(a => a.src).join(', ')


    return `<function ${name}(${a})>`
  }
}

types.Nothing = class {
  constructor() {
    this.value = 'Nothing'
    this.type = 'Nothing'
  }
}

module.exports = types
