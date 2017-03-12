## wew / hello

wew is a functional programming language, which means its syntax is quite easy
to understand compared to imperative languages.

Here's "hello world" in wew:

```wew
import system

system.console.log("Hello, World!")
```

* `import system` imports the entirety of the standard **system** library into
the global scope. wew also supports more types of `import` statements, but we'll
stick with this one for now. [More on import statements](syntax.md#imports)
* `system.console.log` is an identifier that refers to the `console.log`
function from the **system** library we just `import`ed in.
* The rest is a simple function call, using a string as an argument.
[Learn more about functions](syntax.md#functions)
