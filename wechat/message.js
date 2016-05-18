var config  = require('config');
var async   = require('async');
var logger = require('../common/logger');
var api     = require('./api');
var Article = require('../proxy').Article;

exports.text = function(message, callback) {
    if(!message.Content) {
        return callback(new Error('无法处理文本消息'));
    }

    var content = message.Content;
    // 征文活动的二维码生成
    if(/^ZW[0-9]+/.test(message.Content)) {
        var target = message.Content.substring(2);
        async.waterfall([
            function (cb) {
                Article.getArticleByQRCodeID(target, function(err, article){
                    cb(err, article);
                });
            }, function (article, cb) {
                if(!article) {
                    api.createTmpQRCode(target, config.WeChat.qrCodeExpire, 
                        function(err, result) {
                            if(err) {
                                cb(err);
                            }

                            var qrCodeURL = api.showQRCodeURL(result.ticket);
                            cb(null, false, qrCodeURL);
                        }
                    );
                } else {
                    cb(null, true, article.qrCodeURL);
                }
            }
        ], function (err, existed, qrCodeURL) {
                if (err) {
                    var errorMsg = "生成二维码失败，错误：" + err;
                    logger.error(errorMsg);
                    return callback(null, '生成二维码失败');
                }
                
                if (!existed) {
                    Article.createArticleWithQRCode(target, qrCodeURL, 
                        function(err) {
                            if(err) {
                                logger.error("创建推广文章失败，错误：" + err);
                            }
                        }
                    );
                }

                return callback(null, [{
                    title: '快来关注' + target + '吧',
                    description: '请打开页面获取二维码，开始扫码推广吧！',
                    picurl: qrCodeURL,
                    url: qrCodeURL
                }]);
        });
    } else {
        // 自动回复的处理
        callback(null, '自动回复');
    }
};

// 推广的二维码被人扫描
exports.SCAN = function(message, callback) {
    callback(null, '检测到二维码扫描');
};

// 关注事件



