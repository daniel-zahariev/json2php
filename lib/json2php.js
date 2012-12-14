function json2php(obj) {
    var result = 'null', i;
    switch (Object.prototype.toString.call(obj)) {
        case '[object Null]':
        case '[object Undefined]':
            result = 'null';
            break;
        case '[object String]':
            result = "'" + obj.replace('\\', '\\\\').replace("'", "\\'") + "'";
            break;
        case '[object Number]':
            result = '' + obj;
            break;
        case '[object Array]':
            result = 'array(' + obj.map(json2php).join(', ') + ')';
            break;
        case '[object Object]':
            result = [];
            for (i in obj) {
                if(obj.hasOwnProperty(i)) {
                    result.push(json2php(i) + ' => ' + json2php(obj[i]));
                }
            }
            result = 'array(' + result.join(', ') + ')';
            break;
    }
    return result;
}

if (typeof module !== 'undefined' && module.exports)
{
  module.exports  = json2php;
  global.json2php = json2php;
}
