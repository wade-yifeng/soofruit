var async    = require('async');
var config   = require('config');
var oauthApi = require('../wechat/api_oauth');
var api      = require('../wechat/api');
var logger   = require('../common/logger');
var User     = require('../proxy').User;
var auth     = require('../middlewares/auth');
var ErrorMsg = require('../models').Enums.ErrorMessage;

exports.login = function (req, res) {
    req.session._loginReferer = req.headers.referer;
  
    // if(config.debug) {
    //     return res.redirect(req.session._loginReferer);
    // }

    if(req.query.code === undefined) { 
        // 从微信验证跳转，但没有获取到Code
        if(req.headers.referer &&
            require('url').parse(req.headers.referer).hostname === "open.weixin.qq.com") {
            res.status(403);
            return res.render('layout.html', { error: '微信登陆失败' });
        }

        var absoluteURL = req.protocol + '://' + req.get('host') + req.originalUrl;
        var url = oauthApi.getAuthorizeURL(absoluteURL);
        return res.redirect(url);
    }

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
                    }
                });

                auth.gen_session(baseInfo, res);
            }

            res.redirect(req.session.targetUrl);
    });
};