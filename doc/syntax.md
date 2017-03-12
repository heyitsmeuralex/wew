## wew / syntax

This syntax reference serves as an introduction to:

* [Structure](#structure)
* [Comments](#comments)
* [Literals](#literals)
* [Conditionals](#conditionals)
* [Functions](#functions)
* [Operators](#operators)
* [Imports](#imports)
* [Identifiers](#identifiers)

## Structure

* No semicolons.
* Whitespace is mostly ignored.
* Expressions/statements can be seperated by only a single space, newlines
  are not special.

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
like normal variables.

> Currently there is no way to define functions yourself with wew. 
> Patience is a virtue.

## Operators

```wew
# In order of precedence:

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
