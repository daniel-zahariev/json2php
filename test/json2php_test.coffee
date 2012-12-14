json2php = require('../lib/json2php.js')

describe 'json2php', ->
  it 'If you give string you should get string.', ->
    string = 'dummydummy'
    assert.equal "'#{string}'", json2php(string)

  it 'If you give number you should get number.', ->
    assert.equal 1, json2php(1)
    assert.equal -1, json2php(-1)
    assert.equal 0, json2php(0)

  it 'if you give undefined or null you should get null.', ->
    assert.equal 'null', json2php(undefined)
    assert.equal 'null', json2php(null)

  it 'If you give array you should get php array.', ->
    # Single level
    assert.equal 'array(1, 2, 3)', json2php([1, 2, 3])
    # Multi level
    assert.equal 'array(1, array(2), 3)', json2php([1, [2], 3])

  it 'If you give object you should get php array of it.', ->
    assert.equal "array('a' => 1, 'c' => 'text')", json2php({ a:1, c:'text'})
  
