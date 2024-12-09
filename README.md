json2php
========

### Installation

To install json2php you could clone the project from GitHub or use NPM to install it.

```bash
npm install json2php
```

### Usage

Convert JavaScript object/array/string/number/bigint/boolean/Date to string that is the corresponding PHP representation.

#### String

When the content is just a string the output will be the same string.

```javascript
s = json2php('Hello World!')
// => s = 'Hello World!'
```

#### Number & BigInt

Number and BigInt types are the same.

```javascript
s = json2php(123)
// => s = '123'
b = json2php(BigInt(123))
// => b = '123'
```

#### Boolean

```javascript
s = json2php( true )
// => s = 'true'
```

#### Undefined/Null

`null` and `undefined` are returned as `null`

```javascript
s = json2php(undefined)
// => s = 'null'
```

#### Symbol/Function

`Symbol` and `Function` are returned as `null`

```javascript
s = json2php(Symbol(test))
// => s = 'null'
f = json2php(function greet(name) { return `Hello, ${name}!`; })
// => f = 'null'
```

#### Date

Dates are formatted to string using `toISOString` method

```javascript
s = json2php(new Date('2020-06-19 18:20:34')))
// => s = '2020-06-19T15:20:34.000Z'
```

#### Array

```javascript
s = json2php([1, 2, 3])
// => s = 'array(1, 2, 3)'
```

#### Object

```javascript
s = json2php({a: 1, b: 2, c: 'text', false: true, undefined: null})
// => s = "array('a' => 1, 'b' => 2, 'c' => 'text', 'false': true, 'undefined': null)"
```

#### Non-valid JSON

```javascript
s = json2php(new Date())
// => s = "null"
```

### Pretty printing
Create custom 'printers' with `json2php.make`: 

```javascript
const printer = json2php.make({linebreak:'\n', indent:'\t', shortArraySyntax: true})
printer({one: 3, two: 20, three: [9, 3, 2]})

/* result:
[
	'one' => 3, 
	'two' => 20, 
	'set' => [
		9, 
		3, 
		2
	]
]
*/
```

### Compressing the output
To compress the output (e.g. to make the resulting PHP as small as possible), use `shortArraySyntax` with `stripSpaces`:

```javascript
const printer = json2php.make({shortArraySyntax: true, stripSpaces: true})
printer({
  arr: [1, 2, 3, 4, 5, {foo: 'surprise!'}],
  obj: {
    arr: [{foo: 'bar', bar: 'baz', arr2: [1, 2]}]
  }
})

// result:
// ['arr'=>[1,2,3,4,5,['foo'=>'surprise!']],'obj'=>['arr'=>[['foo'=>'bar','bar'=>'baz','arr2'=>[1,2]]]],'test'=>'str']
```

### Changelog

#### 0.0.12
  * Up the release management & cleanup

#### 0.0.11
  * Add support for Date and BigInt types

#### 0.0.10
  * Rewrite to TypeScript

#### 0.0.9
  * Add `stripSpaces` to pretty print options (thanks to @noahtallen)

#### 0.0.7
  * Add `shortArraySyntax` to pretty print options

#### 0.0.6
  * Add pretty print capability via `json2php.make` (thanks to @stokesman)

#### 0.0.5
  * Update and clean up (thanks to @SumoTTo)
  * Add boolean type (thanks to @SumoTTo)

#### 0.0.4
  * Fix for single quotes escaping (thanks to @ksky521)

#### 0.0.3
  * Fixed the case when non-valid JSON is passed
  * Fixing the bug with the object section

#### 0.0.2
  * Adding the package.json to Git repository, also package dependency
  * Changes into the file structure
  * Adding CoffeeScript source ( Not finished yet )
  * Adding Cakefile and task `test`
  * Adding Mocha for test framework.
  * Adding `test`, `src`, `lib` directory
  * Adding tests

#### 0.0.1
  * Init the project into NPM
  * module.exports for Node.js
  * Added json2php into the global scope with global.json2php
