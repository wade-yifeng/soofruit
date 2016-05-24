var wechat  = require('wechat');
var config  = require('config');
var logger  = require('../common/logger');
var handler = require('./handler');

// 消息分割的正则表达式
var msgReg  = /(?=\S)[^\+]+?(?=\s*(\+|$))/g;
// 消息关键字
// GZ: 获取文章关注列表
var msgTags = {'GZ': 'getArticleRecordsRank'};
// 微信消息回复
var msg = {
    'ErrorRely': '小北暂时还不知道你在说啥，并向你扔了个自动回复',
    'NoReply': '小北想偷偷告诉你，发送：想说的话+微信昵称，可以给对方发送悄悄话哦\n只能帮到这里咯 ╮(╯▽╰)╭ ',
};

exports.text = function(message, callback) {
    if(!message.Content) {
        return callback(new Error('无法处理文本消息'));
    }

    // 征文活动的二维码生成
    if(/^ZW[0-9]+/.test(message.Content)) {
        var target = message.Content.substring(2);
        return handler.generateQRCode(target, callback);
    }

    var array = msgReg.match(message.Content);
    if(array.length !== 2) {
        return callback(null, msg.NoReply);
    }

    var content = array[0];
    var targetName = array[1];
    if(msgTags[targetName]) {
        return handler[msgTags[targetName]](content);
    }

    return handler.saveUserWisper(message.FromUserName, targetName, content, callback);
};

exports.post = wechat(config.WeChat, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    logger.info(message);
    if(message !== undefined) {
        var type = message.MsgType === "event" ? message.Event : message.MsgType;
        
        if(this[type]) {
            this[type](message, function(err, reply) {
                if(err) {
                    logger.error(util.format(ErrorMsg.GeneralErrorFormat, "处理公众号消息", err));
                    reply = msg.ErrorRely;
                }
                
                res.reply(msg);
            });
        }
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