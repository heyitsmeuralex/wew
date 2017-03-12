const guard = () => {} // TODO

// system
module.exports = {
  // system.console
  console: {
    // system.console.log
    log: function(_, string) {
      guard(string, 'String', 'system.console.log')

      console.log(string.value)
    },

    // system.console.trace
    trace: function({ line }, any) {
      console.log(`trace on line ${line}:`, any.value)
    }
  }
}
