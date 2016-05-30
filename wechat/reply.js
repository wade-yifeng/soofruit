var wechat   = require('wechat');
var config   = require('config');
var util     = require('util');
var logger   = require('../common/logger');
var handler  = require('./message');
var ErrorMsg = require('../models').Enums.ErrorMessage;

var msg = {
    'ErrorRely': '小北暂时还不知道你在说啥，并向你扔了个自动回复'
};

exports.post = wechat(config.WeChat, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var weixin = req.weixin;
    logger.info(weixin);
    if(!weixin) {
        return next();
    }
    var type = weixin.MsgType === "event" ? weixin.Event : weixin.MsgType;

    if(handler[type]) {
        handler[type](weixin, function(err, reply) {
            if(err) {
                logger.error(util.format(ErrorMsg.GeneralErrorFormat, "处理公众号消息", err));
                reply = msg.ErrorRely;
            }

            res.reply(reply);
        });
    } else if(type === "LOCATION") {
        // TODO: 目前没有处理地理位置
        res.reply('');
    } else {
        res.reply(msg.ErrorRely);
    }
});

exports.get = function (req, res) {
    // 签名成功
    if (wechat.checkSignature(req.query, config.WeChat.token)) {
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
};