const { Function: f, Nothing } = require('../src/types')
const guard = () => {} // TODO

module.exports = {
  console: {
    log: new f(({}, str) => {
      console.log(str.value)
    }, { src: 'str', type: 'String' }, 'log'),

    trace: new f(({ line }, any) => {
      if (any == undefined) any = new Nothing

      console.log(`trace on line ${line}:\n  `, any.value, ':', any.type)
    }, { src: 'x' }, 'trace')
  }
}
