var RJSON = require('../lib/rjson.js');

exports['noRegexp'] = function(test){
  test.deepEqual(RJSON.parse('[1,2,3]'), [1,2,3], 'simple array');
  test.deepEqual(RJSON.parse('{"a":1,"b":2,"c":3}'), {a:1,b:2,c:3}, 'simple object');

  test.deepEqual(RJSON.parse('{"a":{"a":1,"b":2}}'), {a:{a:1,b:2}}, 'object nested in object');
  test.deepEqual(RJSON.parse('[1,2,[1,2]]'), [1,2,[1,2]], 'array nested in array');
  test.deepEqual(RJSON.parse('[1,2,{"a":1,"b":2}]'), [1,2,{a:1,b:2}], 'object nested in array');
  test.deepEqual(RJSON.parse('{"a":1, "b":[1,2,3]}'), {a:1,b:[1,2,3]}, 'array nested in object');

  test.done();
};

exports['malform json'] = function(test){
  test.throws(function(){ RJSON.parse('{"a":1,"b":2,"c":3'); }, 'exception');
  test.done();
};

exports['withRegexp'] = function(test){
  test.deepEqual(RJSON.parse('{"a":"$RE/hoge/"}'), {a: /hoge/}, 'simple object');
  test.deepEqual(RJSON.parse('{"a":"$RE/hoge/i"}'), {a: /hoge/i}, 'simple object with option i');
  test.deepEqual(RJSON.parse('{"a":"$RE/hoge/g"}'), {a: /hoge/g}, 'simple object with option g');
  test.deepEqual(RJSON.parse('{"a":"$RE/hoge/m"}'), {a: /hoge/m}, 'simple object with option m');
  test.deepEqual(RJSON.parse('{"a":"$RE/hoge/igm"}'), {a: /hoge/igm}, 'simple object with options igm');
  test.deepEqual(RJSON.parse('{"a":"$RE/hoge/igm", "b":"$RE/fuga/"}'), {a: /hoge/igm, b:/fuga/}, 'simple object including multiple RegExp objects');

  test.deepEqual(RJSON.parse('["$RE/hoge/", "$RE/fuga/i", "$RE/piyo/gm"]'), [/hoge/, /fuga/i, /piyo/gm], 'array including multiple RegExp object');

  test.deepEqual(RJSON.parse('{"a":{"b":"$RE/hoge/"}}'), {a:{b:/hoge/}}, 'object nested in object');
  test.deepEqual(RJSON.parse('["$RE/hoge/", ["$RE/hoge/"]]'), [/hoge/, [/hoge/]], 'array nested in array');
  test.deepEqual(RJSON.parse('["$RE/hoge/", {"a":"$RE/fuga/i"}, "$RE/piyo/gm"]'), [/hoge/, {a:/fuga/i}, /piyo/gm], 'object nested in array');
  test.deepEqual(RJSON.parse('{"a":"$RE/hoge/", "b": ["$RE/fuga/i", "$RE/piyo/gm"]}'), {a:/hoge/, b:[/fuga/i, /piyo/gm]}, 'array nested in object');
  test.done();
};
