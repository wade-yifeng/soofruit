/*!
 * 主动调用微信API的基础类：
 * 多进程间共享Redis数据，订阅AccessToken刷新事件
 */

var config = require('config');
var util = require('./lib/util');
var API = require('./lib/active');
// 用户信息
API.mixin(require('./lib/active_user'));
// 推广二维码
API.mixin(require('./lib/active_qrcode'));
var fs = require('fs');

module.exports = new API(config.WeChat.appID, config.WeChat.appSecret, 
    function (callback) {
      // 获取对应的全局token
        fs.readFile('access_token.txt', 'utf8', function (err, txt) {
            if (err || util.isNullOrWhitespace(txt)) {
                return callback(err);
            }
            callback(null, JSON.parse(txt));
        });
    }, function (token, callback) {
        // 使用redis的发布订阅模式存储token，需要在cluster模式及多机情况下使用
        fs.writeFile('access_token.txt', JSON.stringify(token), callback);
    }
);