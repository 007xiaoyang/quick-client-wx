// 把对象转换为string，提供对象 和 分割符。
function objToString(obj, split=';') {
  if(typeof obj !=="object") return '';
  let a='';
  for(let i in obj){
	  a+=i+':'+obj[i]+split;
  }
  return a;
}

/**
 * 将字符串转换成对象
 * @param {Object} strDes  [字符串]
 * @param {Object} delimiter [分隔符]
 */
function stringToObj(strDes, delimiter=";"){
	var obj = {};
	if(strDes == null || strDes == ''){
		return obj;
	}

	var arr = strDes.split(delimiter);
	var k, v, sub;
	for (var i = 0, len = arr.length; i < len; i++) {
		
		if(arr[i] !== ''){
			k = arr[i].slice(0,arr[i].indexOf(':'));
			v = arr[i].slice(arr[i].indexOf(':') + 1);
			if (k !== '') {
				obj[k] = v;
			}
		}
	}
	return obj;
}

module.exports = {
	objToString,
	stringToObj
}
