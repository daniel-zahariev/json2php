json2php
========

### Instalation

To install json2php you could clone the project from Github or use NPM to install it.

```bash
$ npm install json2php
```

Convert JSON to PHP representation

### Examples

- String

	json2php('Hello World!') -> 'Hello World!'

- Numer

	json2php(123) -> 123

- Undefined/Null

	json2php(undefined) -> null

- Array

	json2php([1, 2, 3]) -> array(1, 2, 3)

- Object

	json2php({a: 1, b: 2, c: 'text'}) -> array('a' => 1, 'b' => 2, 'c' => 'text')

- Non-valid JSON

	json2php(new Date()) -> null

### Changelog

#### 0.0.2
  * Fixed the case when non-valid JSON is passed

#### 0.0.1
  * Init the project into NPM 
  * module.exports for Node.js 
  * Added json2php into the global scope with global.json2php

