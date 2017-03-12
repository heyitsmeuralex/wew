const types = {}

types.Any = class {
  constructor(value) {
    this.value = value
  }
}

types.Boolean = class extends types.Any {
  constructor(...rest) {
    super(...rest)
    this.type = 'Boolean'
  }
}

types.String = class extends types.Any {
  constructor(...rest) {
    super(...rest)
    this.type = 'String'
  }
}

module.exports = types
