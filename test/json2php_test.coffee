json2php = require('../src/json2php.coffee')

describe 'json2php', ->
  it 'If you give string you should get string.', ->
    assert.equal "'dummydummy'", json2php("dummydummy")
    assert.equal "'\\\'escaping\\\'quotes\\\''", json2php("'escaping'quotes'")

  it 'If you give number you should get number.', ->
    assert.equal 1, json2php(1)
    assert.equal -1, json2php(-1)
    assert.equal 0, json2php(0)

  it 'if you give true or false you should get boolean true or false.', ->
    assert.equal 'true', json2php(true)
    assert.equal 'false', json2php(false)

  it 'if you give undefined or null you should get null.', ->
    assert.equal 'null', json2php(undefined)
    assert.equal 'null', json2php(null)

  it 'If you give array you should get php array.', ->
    # Single level
    assert.equal 'array(1, 2, 3)', json2php([1, 2, 3])
    # Multi level
    assert.equal 'array(1, array(2), 3)', json2php([1, [2], 3])

  it 'If you give object you should get php array of it.', ->
    assert.equal "array('a' => 1, 'c' => 'text', 'false' => true, 'undefined' => null)", json2php({ a:1, c:'text', false: true, undefined: null})

  it 'If you give object you should get php array of it.', ->
    assert.equal "array('name' => 'Noel', 'surname' => 'Broda', 'childrens' => array('John' => array('name' => 'John', 'surname' => 'Bainotti'), 'Tin' => array('name' => 'Tin', 'surname' => 'Tassi')))", json2php({ name: 'Noel', surname: 'Broda', childrens: { John: {name: 'John', surname: 'Bainotti'}, Tin: {name: 'Tin', surname: 'Tassi'} } })

describe 'json2php.make({linebreak:"🔪", indent:"🧱"})', ->
  it 'returns a pretty printed php array given an array or object.', ->
    pretty = json2php.make({linebreak:'🔪', indent:'🧱'})
    assert.equal(
      "array(🔪🧱'one',🔪🧱'two',🔪🧱array(🔪🧱🧱'name' => 'Noel',🔪🧱🧱'surname' => 'Broda',🔪🧱🧱'childrens' => array(🔪🧱🧱🧱'John' => array(🔪🧱🧱🧱🧱'name' => 'John',🔪🧱🧱🧱🧱'surname' => 'Bainotti'🔪🧱🧱🧱),🔪🧱🧱🧱'Tin' => array(🔪🧱🧱🧱🧱'name' => 'Tin',🔪🧱🧱🧱🧱'surname' => 'Tassi'🔪🧱🧱🧱)🔪🧱🧱)🔪🧱)🔪)",
      pretty(['one', 'two', { name: 'Noel', surname: 'Broda', childrens: { John: {name: 'John', surname: 'Bainotti'}, Tin: {name: 'Tin', surname: 'Tassi'} } }])
    )
