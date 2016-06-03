var config   = require('config');
var util     = require('util');
var async    = require('async');
var logger   = require('../common/logger');
var api      = require('./api');
var ErrorMsg = require('../models').Enums.ErrorMessage;
var Article  = require('../proxy').Article;
var User     = require('../proxy').User;
var Reply    = require('../proxy').Reply;
var tools    = require('../common/utility');

// 微信消息回复
var msgReply = {
    'QRCodeTitle': '快来关注%d吧',
    'QRCodeDescription': '打开页面获取完整二维码，开始扫码推广！',
    'WisperReply': '小北帮你记住悄悄话了，友情提示：对同个人的悄悄话只能记得一句哦~',
    'ScanWithException': '系统表示一脸懵逼，主子请稍等啊！',
    'ScanWithoutArticle': '没有找到二维码对应的文章哦，请联系我们的小编吧~',
    'ScanArticleSuccess': '感谢您支持%s的文章《%s》，猛戳<a href="%s">这里</a>去看看详情吧'
};

/**
 * 生成推广关注二维码
 * Callback:
 * - err, 生成（读取）二维码异常
 * - msg, 自动回复消息
 * @param {String} qrCodeID 推广二维码场景ID
 */
exports.generateQRCode = function(qrCodeID, callback) {
    async.waterfall([
        function (cb) {
            Article.getArticleByQRCodeID(qrCodeID, cb);
        }, function (article, cb) {
            if(!article) {
                api.createTmpQRCode(qrCodeID, config.WeChat.qrCodeExpire,
                    function(err, result) {
                        if(err) {
                            return cb(err);
                        }

                        var qrCodeURL = api.showQRCodeURL(result.ticket);
                        return cb(null, false, qrCodeURL);
                    }
                );
            } else {
                cb(null, true, article.qrCodeURL);
            }
        }
    ], function (err, existed, qrCodeURL) {
        if (err) {
            logger.error(util.format(ErrorMsg.GeneralErrorFormat, "生成二维码", err));
            return callback(err);
        }

        // run as async
        if (!existed) {
            Article.createArticleWithQRCode(qrCodeID, qrCodeURL,
                function(err) {
                    if(err) {
                        logger.error(util.format(ErrorMsg.DBErrorFormat,
                            "创建推广二维码对应的文章", {qrCodeID: qrCodeID, qrCodeURL: qrCodeURL}, err));
                    }
                }
            );
        }

        return callback(null, [{
            title: util.format(msgReply.QRCodeTitle, qrCodeID),
            description: msgReply.QRCodeDescription,
            picurl: qrCodeURL,
            url: qrCodeURL
        }]);
    });
};

/**
 * 保存用户悄悄话
 * Callback:
 * - err, 更新悄悄话推送异常
 * - msg, 自动回复消息
 * @param {String} openID 目标用户的OPNEID
 * @param {String} targetName 推送目标的微信昵称
 * @param {String} content 推送消息的内容
 */
exports.saveUserWisper = function(openID, targetName, content, callback) {
    async.waterfall([
        function (cb) {
            api.getUser(openID, cb);
        }, function(baseInfo) {
            // getUser返回不止一个参数,获取最后一个callback参数
            var cb = arguments[arguments.length - 1];
            Reply.updateReply(
            {
                nickName: baseInfo.nickname,
                targetName: targetName,
                msg: content
            }, cb);
        }
    ], function (err, result) {
        if (err) {
            logger.error(util.format(ErrorMsg.GeneralErrorFormat, "更新悄悄话推送", err));
            return callback(err);
        }

        return callback(null, msgReply.WisperReply);   
    });
};

/**
 * 推广的二维码被扫描
 * Callback:
 * - err, 获取二维码对应信息异常
 * - msg, 自动回复消息
 * @param {String} message 目标用户的OPNEID
 * @param {String} targetName 推送目标的微信昵称
 * @param {String} content 推送消息的内容
 */
exports.SCAN = function(message, callback) {
    // TODO: 目前只支持有事件Key和已关注用户的扫描
    if(!message.EventKey || !message.FromUserName) {
        return callback(null, msgReply.ScanWithException);
    }

    Article.getArticleByQRCodeID(message.EventKey, function(err, article){
        if (err) {
            logger.error(util.format(ErrorMsg.GeneralErrorFormat, "根据推广二维码ID查找文章", err));
            return callback(err);
        }

        return callback(null, !article ? msgReply.ScanWithoutArticle : 
            util.format(msgReply.ScanArticleSuccess, 
                article.author, article.title, article.url));
    });
};

