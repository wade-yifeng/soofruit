/*!
 * 调用基于OAuth的微信API基础类：
 * 多进程间共享Redis数据，订阅AccessToken刷新事件
 */

var config = require('config');
var fs     = require('fs');
var OAuth  = require('./lib/oauth');
var cache  = require('../common/cache');

module.exports = new OAuth(config.WeChat.appID, config.WeChat.appSecret, 
    function (openid, callback) {
        cache.get('access_token:' + openid, function (err, txt) {
            if (err || !txt) {
                return callback(err);
            }
            callback(null, JSON.parse(txt));
        });
    }, function (openid, token, callback) {
        cache.set('access_token:' + openid, token, callback);
    }
);