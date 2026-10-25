## Template Literals Recap

Template literals are literals (in JS, literal is any value that is written directrly on code, without passing by a variable
or expression) delimited with backtick (`) characters, allowing for multi-line strings, string interpolation
with embedded expressions, and special constructs called `tagged templates`.

Template literals are sometimes informally called template strings, because they are used most commonly for `string interpolation`
(to create strings by doing substitution of placeholders). However, a tagged template literal may not result in a string,
it can be used with a custom tag function to perform whatever operations we want on the different parts of the template
literal.

Syntax is

`string text`

`string text line 1`
`string text line 2`

`string text ${expression} string text`

'tagFunction`string text ${expression} string text`'

### Parameters

#### string text

The string text that will become part of the template literal. Almost all characters are allowed literallly, including
line breaks and other whitespace characters. However, invalid escapes sequences will cause a syntax error, unless a tag
function is used.

#### expression

An expression to be inserted in the current position, whose value is converted to a string or passed to a `tagFunction`

#### tagFunction

If specified, it will be called with the template strings array and substitution expressions, and the return value becomes
the value of the template literal

### Description

They are enclosed with `(`)` backticks characters instead of double quotes or single quotes.

Along with having normal strings, template literals can also contain other parts called `placeholders`, which are embedded
expressions delimited by dollar sign and curly braces: `${expression}`. The strings and placeholders get passed to a function
— either a default function, or a function we supply. The default function (when we don't supply our own) just perform
string interpolation to do substitution of the placeholders and then concatenate the parts into a single string

To supply a function of our own, precede the template literal with the a function name; the result is called a tagged
template. In that case, the template literal is passed to our tag function, where we can then perform whatever operations
we want on the different parts of template literal

To escape a backtick in a template literal, put a backlash before the backtick

` `\`` === "`" // True

Dollar signs can be escaped as well to prevent interpolation

`\${1}` === "${1}";  === "${1}" // True

### Multi line strings

Any new line characters inserted in the source are part of the template literal.

Using normal strings, we would have to use the following syntax in order to get multi-line strings:

```javascript
console.log("string text line 1\nstring text line 2");
// "string text line 1
// string text line 2"
```

Using template literals we can do the same with this

```javascript
console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"
```

Like `normal string literals`, we can write a single-line string across multiple lines for source code readability, by
escaping newline with a backlash `\`

```javascript
console.log(`string text line 1 \
  string text line 2`);
// "string text line 1 string text line 2"
```

### String interpolation

WIthout template literals, when we want to combine the output from expressions with strings, we would concatenate them using
the addition operator '+', but with template literals we can avoid concatenation and improve the readability of our code —
by using placeholders of the form ${expression} to perform substitutions for embedded expressions

```javascript
const a = 5;
const b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."
```

We can notice that this have a mild difference from the:

```javascript
const a = 5;
const b = 10;
console.log("Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".");
// "Fifteen is 15 and
// not 20."
```

syntax. Template literals coerce their expressions directly to strings. Which by that we mean that JS converts the number
into a string 

### Nesting Template

In certain cases, nesting a template is the easiest way to have configurable strings. Within a backtick delimited template,
it is simple to allow inner backticks by using them inside an `${expression}` placeholder within the template.

For example, without template literals, if we want to return a certain value based on a particular condition, we could
do something like the following:

```javascript
  let classes = "header"

  classes += isLargeScreen()
    ? ""
    : item.isCollapsed
      ? " icon-expander"
      : " icon-collapser"'
```

With a template literal but without nesting, we could do this:

```javascript
const classes = `header ${
  isLargeScreen() ? "" : item.isCollapsed ? "icon-expander" : "icon-collapser
}`;
```

With nesting literals we could do something like

```javascript
  const classes = `header ${
    isLargeScreen() ? "" : : `icon-${item.isCollapsed ? "expander" : "collapser" }
  }
```

### Tagged Templates

*Tagged Templates* are an advanced form of template literals that allow us to parse and manipulate strings using a custom
function (a tag)

Instead of simply returning a interpolated string, the template literals is passed to a function that processes the static
text segments and dynamic expressions, allowing us to return a completely custom result, ranging from sanitized HTML and
localized strings to fully logged structures.

#### How it works

When we prefix a template literal with a function name, JS does not immediately evaluate it into a standard string. Instead,
it invokes the tag function, splitting the literal and delivering its parts following a strict language rule

#### The Tagged Template Signature Rule

When a tag function is invoked, JS delivers arguments in a specific order:

1. First Argument (The Strings Array): Always an array containing the static text parts, split automatically wherever
an interpolation (`${...}`) occurs. This array also possesses a special `raw` property containing the unescaped sequences.

2. Remaining Arguments (...values): The evaluated values of the expressions interpolated inside the template literal

#### Example

```js
const person = "Kyle";
const age = 30;

function logTag(strings, personExp, ageExp) {
  const str0 = strings[0]; // "That "
  const str1 = strings[1]; // " is a "
  const str2 = strings[2]; // "."

  const ageStr = ageExp < 100 ? "youngster" : "centenarian";

  // Re-assembling and returning a new string
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

logTag`That ${person} is a${age}`

// Output:
// Static strings [ 'My name is ', ' and I am ', ' years old.' ]
// Interpolated values [ 'Kyle', 30 ]
```

Notice that even if there are not variables to interpolate. JS still strictly delivers the first argument as an array 
containing the static text

```js
function simpleTag(strings) {
  return strings;
}

console.log(simpleTag`Hello`)

// ['Hello']

```

### Anatomy of a Custom Tag: Formatting & Logic

We can perform any operations we like inside a tag function. For instance, we can construct custom markup, handle formatting,
or conditionally alter output based on expression values:

```js
const person = "Mike";
const age = 30;

function myTag(strings, personExp, ageExp) {
  const str0 = strings[0]; // "That "
  const str1 = strings[1]; // " is a "
  const str2 = strings[2]; // "."

  const ageStr = ageExp < 100 ? "youngster" : "centenarian";

  // Re-assembling and returning a new string
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

const output = myTag`That ${person} is a${age}.`;

console.log(output);
// That Mike is a youngster.
```

### Advanced Expression Tag

The tag expressions does not have a simple identifier. We can use any valid expression with a precedence that allows it,
such as property access, function calls, `bind()`, `new` expressions, or even nested tagged templates.

#### Example 1: Using built in methods such as console.log

console.log`Hello`

1. What happens: console.log acts directly as the tag function. Because there are no interpolated variables. It receives
an array containing a single string ['Hello'] and prints it to the console

#### Example 2: Bound functions (console.log.bind)

`console.log.bind(1, 2)`Hello`;
`// 2 ['Hello']`

What happens: 

1. .bind(1, 2) creates a new wrapper function where this is bound to 1, and the first fixed argument is permanently
set to 2
2. When tagged template  Hello` executes right after, JS passes the bound arguments first (2) followed by the tagged
template arguments  (`['Hello']`).
3. This function is equivalent to calling

`console.log(2, ['Hello']);`

#### Example 3: Dynamic Constructor Invocations

```js
new Function("console.log(arguments)")`Hello`;
// [Arguments] { '0': ['Hello' ] }
```

1. new Function("console.log(arguments)") dynamically creates a new function in runtime
2. The result of new Function(...) expression is itself a callable function, which becomes the tag function.
3. When the tagged template is executed, JS automatically passes the template string array as the first argument
4. Since there are no interpolated expressions, the function receives only one argument ['Hello']. Inside the generated
function, arguments contains:

`arguments[0] === 'Hello'`

#### Example 4: Property access expressions

```js
const logger = {
  print(strings) {
    console.log(strings);
  }
}

logger.print`Hello`;
// [`Hello`]
```

logger.print is evaluated first.
The property access expression returns the `print` function
JS uses the function as the tag
The template literal automatically provides the strings array as the first argument.

#### Example 5: Function call returning a tag function

```js
function createLogger() {
  return function(strings) {
    console.log(strings);
  }
}

createLogger()`Hello`;
```

1. createLogger() executes first
2. Its return value is another function
3. That returned function becomes the tag function
4. JS passes the template strings array to it .

This is equivalent to

```js
  const tag = createLogger();

  tag(['Hello'])
```

#### Example 6: Nested Tagged Templates

```js
  function outer(strings) {
    console.log(strings);
    return inner;
  }

  function inner(strings) {
    console.log(strings);
  }

  outer`First``Second`;

  // ['First']
  // ['Second']
```

1. outer\First`` executes first
2. JS calls outer(['First']).
3. outer returns the function inner.
4. The second tagged template immediately invokes the returned function as a tag
5. JS calls inner(['Second'])

This is equivalent to

```js
  const result = outer(['First'])';

  result(['Second'])
```

### Key Takeaway

The expression before a tagged template does not need to be a simple function name. JS first evaluates the entire expression
and then expects the result to be callable. If the final value is a function, that function becomes the tag and receives:

1. The template strings array as the first argument
2. Each interpolated expression as the subsequent arguments

```js
  tag`Hello ${name} ${age}`

  // equivalent to

  tag(
    ['Hello ', ' ', ''],
    name,
    age
  )
```

This is why property access, functions calls, bind(), constructor expressions, and even tagged templates can all appear
before a template literal. The only requirement is that the evaluated result must be a callable function.


## Bind Function

`bind` is a native method of all the functions in JS. Its main goal is to create a new function with two fixed characteristics:\

1. It defines the value of `this` inside the function.
2. It can fill (or "plaster") some initial arguments that the function will receive

### How does it work in practice?

Its basic syntax is:

Assume we have a sum function

```js
function sum(a, b) {
  console.log(`a = ${a}, b = ${b}`);
  return a + b
}
```

Normally, we would call it like this: sum(2, 6), where a is 2 and b is 6

What `bind()` does with it?

`bind` is used to *lock in* the first argument (and optionally the `this`). For example. lets create a function locking
in a with the value 5

```js
  // .bind(null, 5) means:"
  // 1. `this` will be null (we won't use it in here
  // 2. The first argument `a` keeps locked in forever as 5.

  const sumFive = sum.bind(null, 5);
```

Now the constant `sumFive` becomes a new function. When we call it, we only pass have to pass the next argument, that will
be the `b`

`sumFive(10)` will print 10
