var RJSON = module.exports = function(){};

function _inArray (obj, arr) {
  for(var i = 0, l = arr.length; i < l; i++){
    if(arr[i] === obj){
      return true;
    }
  }
  return false;
}

function _replace (obj, targets){
  var i;
  for(i in obj){
    if(obj.hasOwnProperty(i)){
      if(typeof obj[i] === 'object'){
        _replace(obj[i], targets);
      }else if(_inArray(obj[i], targets)){
        var parsed = obj[i].match(/\$RE\/([^\/]+)\/([igm]*)/);
        obj[i] = new RegExp(parsed[1], parsed[2]);
      }
    }
  }
}

function _replaceToString (obj){
  var i;
  for(i in obj){
    if(obj.hasOwnProperty(i)){
      if(typeof obj[i] === 'object'){
        _replaceToString(obj[i]);
      }else if(obj[i] instanceof RegExp){
        obj[i] = '$RE'+obj[i];
      }
    }
  }
}

RJSON.parse = function(json){
  if(typeof json !== 'string'){
    throw new Error(json + ' is not string');
  }
  var flg = json.indexOf('$RE') > -1;
  try {
    var obj = JSON.parse(json);
    if(flg){
       var re = json.match(/(\$RE\/[^\/]+\/[igm]*)/g);
       if(!re){ throw new Error('illegal regular expression'); }
       _replace(obj, re);
    }
    return obj;
  }catch(ex){
    throw ex;
  }
};

RJSON.stringify = function(obj){
  _replaceToString(obj);
  try {
    return JSON.stringify(obj);
  }catch(ex){
    throw ex;
  }
};
