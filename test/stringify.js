var RJSON = require('../lib/rjson.js');

exports['noRegexp'] = function(test){
  test.deepEqual(RJSON.stringify([1,2,3]), '[1,2,3]', 'simple array');
  test.deepEqual(RJSON.stringify({"a":1,"b":2,"c":3}), '{"a":1,"b":2,"c":3}', 'simple object');

  test.deepEqual(RJSON.stringify({"a":{"a":1,"b":2}}), '{"a":{"a":1,"b":2}}', 'object nested in object');
  test.deepEqual(RJSON.stringify([1,2,[1,2]]), '[1,2,[1,2]]', 'array nested in array');
  test.deepEqual(RJSON.stringify([1,2,{"a":1,"b":2}]), '[1,2,{"a":1,"b":2}]', 'object nested in array');
  test.deepEqual(RJSON.stringify({"a":1, "b":[1,2,3]}), '{"a":1,"b":[1,2,3]}', 'array nested in object');

  test.done();
};


exports['withRegexp'] = function(test){
  test.deepEqual(RJSON.stringify({"a":/hoge/}), '{"a":"$RE/hoge/"}', 'simple object');
  test.deepEqual(RJSON.stringify({"a":/hoge/i}), '{"a":"$RE/hoge/i"}', 'simple object with option i');
  test.deepEqual(RJSON.stringify({"a":/hoge/g}), '{"a":"$RE/hoge/g"}', 'simple object with option g');
  test.deepEqual(RJSON.stringify({"a":/hoge/m}), '{"a":"$RE/hoge/m"}', 'simple object with option m');
  test.deepEqual(RJSON.stringify({"a":/hoge/igm}), '{"a":"$RE/hoge/gim"}', 'simple object with options igm');
  test.deepEqual(RJSON.stringify({"a":/hoge/igm, "b":/fuga/}), '{"a":"$RE/hoge/gim","b":"$RE/fuga/"}', 'simple object including multiple RegExp objects');

  test.deepEqual(RJSON.stringify([/hoge/, /fuga/i, /piyo/gm]), '["$RE/hoge/","$RE/fuga/i","$RE/piyo/gm"]', 'array including multiple RegExp object');

  test.deepEqual(RJSON.stringify({"a":{"b":/hoge/}}), '{"a":{"b":"$RE/hoge/"}}', 'object nested in object');
  test.deepEqual(RJSON.stringify([/hoge/, [/hoge/]]), '["$RE/hoge/",["$RE/hoge/"]]', 'array nested in array');
  test.deepEqual(RJSON.stringify([/hoge/, {"a":/fuga/i}, /piyo/gm ]), '["$RE/hoge/",{"a":"$RE/fuga/i"},"$RE/piyo/gm"]', 'object nested in array');
  test.deepEqual(RJSON.stringify({"a":/hoge/, "b": [/fuga/i, /piyo/gm]}), '{"a":"$RE/hoge/","b":["$RE/fuga/i","$RE/piyo/gm"]}', 'array nested in object');
  test.done();
};
