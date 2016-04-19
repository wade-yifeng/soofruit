/*!
 * 调用基于OAuth的微信API基础类：
 * 多进程间共享Redis数据，订阅AccessToken刷新事件
 */

var config = require('config');
var OAuth = require('./lib/oauth');
var fs = require('fs');

module.exports = new OAuth(config.WeChat.appID, config.WeChat.appSecret, 
    function (openid, callback) {
        // 根据openid获取对应的全局token
        fs.readFile(openid +':access_token.txt', 'utf8', function (err, txt) {
            if (err) {
                return callback(err);
            }
            callback(null, JSON.parse(txt));
        });
    }, function (openid, token, callback) {
        // TODO: 使用redis的发布订阅模式存储token，需要在cluster模式及多机情况下使用
        // 每个openid都对应一个唯一的token!
        fs.writeFile(openid + ':access_token.txt', JSON.stringify(token), callback);
    }
);