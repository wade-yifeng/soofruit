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

exports.