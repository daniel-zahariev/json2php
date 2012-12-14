json2php
========

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
