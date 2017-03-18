## wew / syntax

This syntax reference serves as an introduction to:

* [Structure](#structure)
* [Comments](#comments)
* [Assignment](#assignment)
* [Literals](#literals)
* [Conditionals](#conditionals)
* [Functions](#functions)
* [Defining functions](#defining-functions)
* [Operators](#operators)
* [Imports](#imports)
* [Identifiers](#identifiers)

## Structure

Expressions/statements are terminated by either newlines or semicolons. The
behaviour is similar to Python's: **when in parentheses or square brackets,
newlines are ignored**.

Other than that, whitespace is ignored.

## Comments

```wew
# single line comment

#{ multiline
   comment }
```

This syntax allows for a really neat trick:

```wew
#{
system.console.log('Hello, wew!')
#}
```

Just add or remove the `{` on the first line and you'll toggle between commented
and uncommented!

## Assignment

```js
one = 1
hello_world = 'hello world'
```

All variables are constant.

## Literals

```wew
# Booleans
true
false

# Numbers
24
5.25
.80

# Strings
'hello world'
"escaping is ok: \"see\"?"

# Multiline strings
`Roses are red
violets are blue`

# Functions
add_one n => n + 1

# Maps
[ a -> 1,
  b -> 2,
  c -> 3 ]
```

## Conditionals

```wew
if n > 9000
  then `It's over 9000!`
  else `¯\_(ツ)_/¯`
```

**if..then..else** is an expression, so you can use it in any form you like:

```wew
system.console.log(if true then 'fact' else 'alternative fact')
```

Just make sure to always provide the `else` part - omission is invalid.

## Functions

```wew
myfunction('argument', true, .3, somevariable)
```

Functions are invoked (called) in a way that should be familiar to all
programmers. Functions are first-class, too, so you can pass them around just
like normal variables. [How to define functions](#defining-functions)

You can also use the forward pipe operator.

```wew
'hello' >> String.reverse
# equivalent to
String.reverse('hello')
```

Or the _backward_ pipe operator.

```wew
log << String.reverse << 'hola'
# equivalent to
log(String.reverse('hola'))
```

## Defining functions

```wew
name(arg1, arg2, ...) => expression

# the function name is optional:
(a, b, c) => a + b - c

# parentheses are optional when there's only one parameter:
n => n + 1
add_one n => n + 1

# a function with *no* parameters requires parentheses:
noop() => Nothing
```

## Operators

```wew
# In order of precedence:

Function ( Expression, Expression, ... )
( Expression )

not Boolean
Boolean and Boolean
Boolean or Boolean

Number ^ Number
Number * Number
Number / Number
Number + Number # use .. to concat strings
Number - Number

String .. String

Expression  |> Expression
Expression <|  Expression
```

## Imports

```wew
import system # standard, builtin

system.console.log('hello and welcome to my cool wew program')
```

You can also selectively import things:

```wew
import log, trace from system.console

log('selective imports are cool!')
trace('wow!!')
```

Or just de-namespace them;

```wew
import * from system

console.trace(console.log) # fun fun fun!
```

## Identifiers

Identifier names must follow the following rules.

* Must start with a letter or an underscore.
* May only contain alphanumeric characters and underscores.
* Case sensitive.

In regular expression form:
```regex
[a-zA-Z_][a-zA-Z0-9_]*
```
