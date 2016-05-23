var async = require('async');
var config = require('config');

var oauthApi = require('../wechat/api_oauth');
var api = require('../wechat/api');
var logger = require('../common/logger');

var User = require('../proxy').User;
var authMiddleWare = require('../middlewares/auth');

exports.login = function (req, res) {
    if(config.debug) {
        res.redirect(req.session.targetUrl);
    }

    // 第一次跳转
    if (req.query.code === undefined) {
        var absoluteURL = req.protocol + '://' + req.get('host') + req.originalUrl;
        var url = oauthApi.getAuthorizeURL(absoluteURL);
        res.redirect(url);
    }
    else {
        async.waterfall([
            function (callback) {
                oauthApi.getAccessToken(req.query.code, function (err, result) {
                    if (!err && (result.data === undefined || result.data.openid === undefined)) {
                        callback(new Error('调用微信API获取openid失败'));
                    }

                    callback(err, result.data.openid);
                });
            }, function (openID, callback) {
                api.getUser(openID, function (err, result) {
                    callback(err, result);
                });
            }
        ], function (err, baseInfo) {
                if (err) {
                    logger.error("获取微信身份信息失败，错误：" + err);
                }
                else {
                    User.updateUserByUnionID(baseInfo, function(err, result) {
                        if(err) {
                            logger.error('更新用户失败' + err);
                        } else{
                            logger.info('更新或新建用户：');
                            console.log("result: %j", result);
                            logger.info("result: %j", result);
                        }
                    });

                    authMiddleWare.gen_session(baseInfo, res);
                }

                res.redirect(req.session.targetUrl);
        });
    }
};