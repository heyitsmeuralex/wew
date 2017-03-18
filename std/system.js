const types = require('../src/types')
const guard = () => {} // TODO

module.exports = new types.Map({
  console: new types.Map({
    log: new types.Function(({}, str) => {
      console.log(str.value)
    }, [{ src: 'str', type: 'String' }], 'system.console.log'),

    trace: new types.Function(({ line }, any) => {
      if (any == undefined) any = new types.Nothing

      console.log(`trace on line ${line}:\n `,
                  any.value.toString().replace(/\n/g, '\n  ')
                  , ':', any.type)
    }, [{ src: 'x' }], 'system.console.trace')
  })
})
