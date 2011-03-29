RJSON
=======

RJSON is a JSON object which can parse RegExp object.
To parse RegExp, write prefix "$RE".
ex. write '"$RE/hogehoge/"', it parsed /hogehoge/.

* simple use 

 var RJSON = require('RJSON');
 RJSON.parse('{"a":"$RE/hogehoge/"}') // => {a: /hogehoge/}

