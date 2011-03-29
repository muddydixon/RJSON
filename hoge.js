var RJSON = require('./lib/rjson.js');

var a = RJSON.parse('{"a":1,"b":2,"c":3}');

try{
  var b = RJSON.parse('{"a":1,"b":2,"c":3');
}catch(ex){
  console.log(ex);
}

console.log(a);
