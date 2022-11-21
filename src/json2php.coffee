make = ({linebreak = '', indent = ''} = {}) ->
  nest = {
    '[object Array]': (obj, indent, parentIndent) -> 
      for value in obj
        transform(value, indent, parentIndent)

    '[object Object]': (obj, indent, parentIndent) ->
      for own key, value of obj
        transform(key, indent, parentIndent) + ' => ' + transform(value, indent, parentIndent)
  }

  transform = (obj, localIndent = '', parentIndent = '') ->
    objType = Object.prototype.toString.call(obj)
    switch objType
      when '[object Null]', '[object Undefined]'
        result = 'null'
      when '[object String]'
        result = "'" + obj.replace(///\\///g, '\\\\').replace(///\'///g, "\\'") + "'"
      when '[object Number]', '[object Boolean]'
        result = obj.toString()
      when '[object Array]', '[object Object]'
        nestIndent = localIndent + indent
        items = nest[objType](obj, nestIndent, localIndent)
        result = """
          array(#{linebreak + nestIndent}#{
            items.join(',' + if linebreak == '' then ' ' else linebreak + nestIndent)
          }#{linebreak + localIndent })
        """
      else
        result = 'null'
    result

json2php = make()

json2php.make = make

if typeof module isnt 'undefined' and module.exports
  module.exports = json2php
  # Not that good but usefull
  global.json2php = json2php
