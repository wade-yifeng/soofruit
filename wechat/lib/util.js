/**
 * 参见：http://mp.weixin.qq.com/wiki/index.php?title=返回码说明
 */
exports.wrapper = function (callback) {
    return function (err, data, res) {
        callback = callback || function () {};

        if (err) {
            err.name = 'WeChatAPI' + err.name;
            return callback(err, data, res);
        }

        if (data.errcode) {
            err = new Error(data.errmsg);
            err.name = 'WeChatAPIError';
            err.code = data.errcode;
            return callback(err, data, res);
        }
        
        callback(null, data, res);
    };
};

/*!
 * 对提交参数一层封装，当POST JSON，并且结果也为JSON时使用
 */
exports.postJSON = function (data) {
  return {
    dataType: 'json',
    type: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

exports.make = function (host, name, fn) {
  host[name] = function () {
    this.preRequest(this['_' + name], arguments);
  };
  host['_' + name] = fn;
};