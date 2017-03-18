const types = {}
const error = require('./error')

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

types.Map = class {
  constructor(obj) {
    try {
      this.map = new Map(obj)
    } catch(e) {
      this.map = new Map()

      for (let key in obj) {
        let value = obj[key]
        this.set(key, value)
      }
    }

    this.type = 'Map'
  }

  get(key) {
    return this.map.get(key)
  }

  set(key, value) {
    // should this be constant?
    return this.map.set(key, value)
  }

  get value() {
    // Construct string representation of this map

    if (this.map.size === 0)
      return '{}'

    let res = '{ '
    let first = true
    let longestKeyLength = 0

    for (let key of this.map.keys()) {
      if (key.length > longestKeyLength) longestKeyLength = key.length
    }

    for (let [ key, value ] of this.map) {
      if (!first) res += '\n  '
      else first = false

      res += key // display type too?
      res += ' '.repeat(longestKeyLength - key.length)
      res += ' -> '

      if (value === this)
        res += '<recursive>'
      else
        res += value.value.length > 24
             ? value.value.substr(0, 21)
             + '...'
             + value.value.substr(-1)
             : value.value
      res += ','
    }

    return res.substr(0, res.length - 2) + ' }'
  }
}

types.Nothing = class {
  constructor() {
    this.value = 'Nothing'
    this.type = 'Nothing'
  }
}

module.exports = types
