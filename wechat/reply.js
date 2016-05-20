var wechat  = require('wechat');
var config  = require('config');
var logger  = require('../common/logger');
var handler = require('./message');

module.exports.post = wechat(config.WeChat, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    logger.info(message);
    if(message !== undefined) {
        var type = message.MsgType === "event" ? message.Event : message.MsgType;
        
        if(handler[type]) {
            handler[type](message, function(err, msg) {
                if(err) {
                    logger.error("处理公众号请求失败，错误：" + err);
                    msg = '小北暂时还不知道你在说啥，并向你扔了个自动回复';
                }
                
                res.reply(msg);
            });
        }
    }
});

module.exports.get = function (req, res) {
    // 签名成功
    if (wechat.checkSignature(req.query, config.WeChat.token)) {
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
};