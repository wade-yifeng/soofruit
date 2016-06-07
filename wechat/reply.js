var wechat     = require('wechat');
var config     = require('config');
var util       = require('util');
var handler    = require('./handler');
var EventProxy = require('../common/event_proxy');
var logger     = require('../common/logger');
var ErrorMsg   = require('../models').Enums.ErrorMessage;

// 消息分割的正则表达式
var msgReg  = /(?=\S)[^\+]+?(?=\s*(\+|$))/g;
// 消息关键字
// GZ: 获取文章关注列表
var msgTags = {'GZ': 'getArticleRecordsRank'};
// 微信消息回复
var msgReply = {
    'NoReply': '小北想偷偷告诉你，发送：想说的话+微信昵称，可以给对方发送悄悄话哦\n只能帮到这里咯 ╮(╯▽╰)╭ ',
    'ResultWithException': '系统表示一脸懵逼，主子请稍等啊！',
    'ErrorRely': '小北暂时还不知道如何应答，并向你扔了个自动回复'
};

exports.post = wechat(config.WeChat).text(function (message, req, res, next) {
    logger.info("收到微信Text消息\n", message);
    if(!message.Content) {
        res.reply(msgReply.ErrorRely);
        return next();
    }

    var ep = EventProxy.create();
    ep.fail(function(err) {
        res.reply(msgReply.ResultWithException);
        return next();
    });

    // 调用reply表示处理结束
    ep.on('reply', function (msg) {
        res.reply(msg);
        return next();
    });

    // 征文活动的二维码生成
    if(/^ZW[0-9]+/.test(message.Content)) {
        var target = message.Content.substring(2);
        return handler.generateQRCode(target, ep.done('reply'));
    }

    // 处理关键字消息
    var array = message.Content.match(msgReg);
    if(array.length === 2) {
        var content = array[0];
        var targetName = array[1];
        if(msgTags[targetName]) {
            return handler[msgTags[targetName]](content, ep.done('reply'));
        }

        return handler.saveUserWisper(message.FromUserName, targetName, content, ep.done('reply'));
    }
    
    // 自动回复，TODO: 增加智能回复
    ep.emit('reply', msgReply.NoReply);
}).event(function (message, req, res, next) {
    logger.info("收到微信Event消息\n", message);
    var type = message.Event;
    if(!type) {
        res.reply(msgReply.ErrorRely);
        return next();
    }

    var ep = EventProxy.create();
    ep.fail(function(err) {
        res.reply(msgReply.ResultWithException);
        return next();
    });

    // 调用reply表示处理结束
    ep.on('reply', function (msg) {
        res.reply(msg);
        return next();
    });

    if(handler[type]) {
        return handler[type](message, ep.done('reply'));
    }

    ep.emit('reply', '');
}).location(function (message, req, res, next) {
    // TODO 处理定位消息
    res.reply('');
}).link(function (message, req, res, next) {
    // TODO message为链接内容
    res.reply('');
}).image(function (message, req, res, next) {
    // TODO
    res.reply('');
}).voice(function (message, req, res, next) {
    // TODO
    res.reply('');
}).video(function (message, req, res, next) {
    // TODO
    res.reply('');
}).middlewarify();

exports.get = function (req, res) {
    // 签名成功
    if (wechat.checkSignature(req.query, config.WeChat.token)) {
        res.status(200).send(req.query.echostr);
        return;
    }

    res.status(200).send('fail');
};