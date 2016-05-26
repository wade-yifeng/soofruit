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
var msg = {
    'WisperReply': '小北帮你记住悄悄话了，友情提示：对同个人的悄悄话只能记得一句哦~'
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
                api.createTmpQRCode(target, config.WeChat.qrCodeExpire, 
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
            
            if (!existed) {
                Article.createArticleWithQRCode(target, qrCodeURL, 
                    function(err) {
                        if(err) {
                            logger.error(util.format(ErrorMsg.DBErrorFormat, 
                                "创建推广二维码对应的文章", {target: target, qrCodeURL: qrCodeURL}, err));
                        }
                    }
                );
            }

            return callback(null, [{
                title: '快来关注' + qrCodeID + '吧',
                description: '请打开页面获取完整二维码，开始扫码推广！',
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
 * @param {String} openID 推送目标的微信昵称
 * @param {String} content 推送消息的内容
 */
exports.saveUserWisper = function(openID, targetName, content, callback) {
    async.waterfall([
        function (cb) {
            api.getUser(openID, cb);
        }, function(baseInfo) {
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

        return callback(null, msg.WisperReply);   
    });
};