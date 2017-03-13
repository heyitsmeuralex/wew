## wew / contributing

> **These contribution guidelines are for _codebase_ contributions**. Remember: 
> Anyone is welcome to contribute to [discussions](https://github.com/nanalan/wew/issues?q=is%3Aopen+is%3Aissue+label%3Adiscuss)! Please do, it makes my life
a whole lot easier.

These guidelines are intended for contributions to the wew
[sourcecode](https://github.com/nanalan/wew/tree/master/src),
[standard libraries](https://github.com/nanalan/wew/tree/master/std),
[tests/examples](https://github.com/nanalan/wew/tree/master/test), and
[documentation](https://github.com/nanalan/wew/tree/master/doc):

* [**General Guidelines**](#general-guidelines)
* [Sourcecode & other JavaScript](#sourcecode)
* [Documentation](#documentation)

## General Guidelines

* [Always use commit message emoji!](https://github.com/dannyfritz/commit-message-emoji#which-emoji-to-use-confused) :sparkles:
* Where syntax allows, try to keep all lines to a maximum of 80 characters.
* Filenames use kebab-case.
* Try new things! Just _add_ features that haven't been suggested and create
  PRs.

## Sourcecode

* wew is written in Node.js, and is located in
  [`src`](https://github.com/nanalan/wew/tree/master/src).
* Provide _helpful_ error messages.
* Don't introduce bugs if you can help it :heart:
* Follow the codestyle set out already:
  - Keep semicolons to a minimum.
  - Spaces after keywords: `if (true)`
  - Curly braces should be padded: `{ a: 1, b: 2, c: 3 }`
  - Use es6 - destructuring, arrow functions, 'classes,' and Promises are cool!
  - Square brackets and parens should not be padded by spaces unless used in
    a destructuring expression: `[1, 2, 3]`, `let [ n, ...rest ] = foo`
  - Space after commas: `a, b, c` not `a,b,c`
  - Comments and whitespace are :+1:

## Documentation

* Markdown language documentation is located in
  [`doc`](https://github.com/nanalan/wew/tree/master/doc).
* You don't have to be formal, just be friendly.
* wew is written as "wew," **not** "Wew," even at the start of a sentence.
* Never use `<h1>` or `#`, use `##` as a header.
* Titles of pages should be `wew / subject`. Normally the subject would be
  the same as the filename. Keep it lowercase.
* Don't use camelCase or snake_case. Use nocasingatall.
* Always provide examples.
