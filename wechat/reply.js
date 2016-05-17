var wechat  = require('wechat');
var config  = require('config');
var async   = require('async');
var logger  = require('../common/logger');
var api     = require('../wechat/api');
var Article = require('../proxy').Article;

module.exports.post = wechat(config.WeChat, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    logger.info(message);
    if(message !== undefined) {
        if(message.MsgType === 'text') {
            if(/^ZW[0-9]+/.test(message.Content)) {
                var target = message.Content.substring(2);
                async.waterfall([
                    function (callback) {
                        Article.getArticleByQRCodeID(target, function(err, article){
                            callback(err, article);
                        });
                    }, function (article, callback) {
                        logger.info("尝试获取article" + article);
                        if(!article) {
                            api.createTmpQRCode(target, config.WeChat.qrCodeExpire, 
                                function(err, result) {
                                    if(err) {
                                        callback(err);
                                    }

                                    var qrCodeURL = api.showQRCodeURL(result.ticket);
                                    logger.info(qrCodeURL);
                                    callback(null, false, qrCodeURL);
                                }
                            );
                        } else {
                            callback(null, true, article.qrCodeURL);
                        }
                    }
                ], function (err, existed, qrCodeURL) {
                        if (err) {
                            logger.error("生成二维码失败，错误：" + err);
                            res.reply('生成二维码失败，错误：' + err);
                        }
                        else {
                            if (!existed) {
                                Article.createArticleWithQRCode(target, qrCodeURL, function(err) {
                                    if(err) {
                                        logger.error("创建推广文章失败，错误：" + err);
                                    }
                                });
                            }
                        }

                        res.reply([{
                            title: '快来关注' + target + '吧',
                            description: '请打开页面获取二维码，开始扫码推广吧！',
                            picurl: qrCodeURL,
                            url: qrCodeURL
                        }]);
                });
            }
        }
    }
});

module.exports.get = function (req, res) {
    logger.info(req.query);
    // 签名成功
    if (wechat.checkSignature(req.query, config.WeChat.token)) {
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
};