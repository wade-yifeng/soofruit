/*!
 * 主动调用微信API的基础类：
 * 多进程间共享Redis数据，订阅AccessToken刷新事件
 */

var config = require('config');
var util   = require('./lib/util');
var cache  = require('../common/cache');
var API    = require('./lib/active');

// 用户信息
API.mixin(require('./lib/active_user'));
// 推广二维码
API.mixin(require('./lib/active_qrcode'));
// 公众号菜单
API.mixin(require('./lib/active_menu'));
var fs = require('fs');

module.exports = new API(config.WeChat.appID, config.WeChat.appSecret, 
    function (callback) {
        cache.get('access_token', function (err, txt) {
            if (err || !txt) {
                return callback(err);
            }
            callback(null, JSON.parse(txt));
        });
    }, function (token, callback) {
        cache.set('access_token', JSON.stringify(token), callback);
    }
);