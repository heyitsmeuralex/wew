const path = require('path')
const fs = require('fs')
const types = require('./types')
const std = path.join(__dirname, '..', 'std')

module.exports = ast => new Promise((resolve, reject) => {
  const [, program] = ast
  const globalScope = new Scope()

  for (const chunk of program) {
    const [type, ...rest] = chunk

    switch (type) {
      case 'import':
        const [[, library], what] = rest

        // Where actually *is* this library?
        // (1) look in std/*.js
        // (2) TODO local *file* lookup
        // (3) TODO local library lookup
        // (4) TODO global library lookup

        // XXX: assume (1)
        const libraryName = library[0].src
        const keys = library.slice(1).map(l => l.src)
        const lib = require(path.join(std, libraryName))
        
        function traverse(obj, keys) {
          return keys.length
            ? traverse(obj[keys[0]], keys.slice(1))
            : obj
        }

        if (what) {
          if (what === '*') {
            // Import everything w/o namespace
            let everything = traverse(lib, keys)

            for (let name in everything) {
              globalScope.define(name, everything[name])
            }
          } else {
            // Import `what` only
            for (let item of what.map(w => w.src)) {
              globalScope.define(item, traverse(lib, [...keys, item]))
            }
          }
        } else {
          // Import everything incl. namespace
          const importName = library[library.length - 1].src
          globalScope.define(importName, traverse(lib, keys))
        }

      break

      case 'expression':
        expression(globalScope, ...rest[0])
      break
    }
  }
})

class Scope extends Map {
  define(identifier, value) {
    this.set(identifier, value)
  }

  traverse([, path]) {
    path = path.map(p => p.src)

    function recurse(obj, keys) {
      return keys.length
        ? recurse(obj[keys[0]], keys.slice(1))
        : obj
    }

    return recurse(this.get(path[0]), path.slice(1))
  }
}

const guard = () => {} // TODO

function expression(scope, kind, ...rest) {
  switch (kind) {
    // TODO other structures/operators

    case 'if_conditional':
      const [condition, ifTrue, ifFalse] = rest
      const condRes = expression(scope, ...condition)

      guard(condRes, 'Boolean', 'if condition')

      if (condRes.value === true)
        return expression(scope, ...ifTrue)
      else
        return expression(scope, ...ifFalse)
    break

    case 'function_call':
      const [ident, args, { line, col }] = rest

      // Grab the fn from our current scope
      let fn = scope.traverse(ident)

      // Call the fn
      // TODO user-defined functions
      fn({ line, col, scope }, ...args.map(arg => expression(scope, ...arg)))
    break

    case 'string':
      return new types.String(rest[0])
    break

    case 'bool':
      return new types.Boolean(rest[0])
    break

    default:
      throw `unknown expression kind: ${kind}`
  }
}
