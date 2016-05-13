var mongoose   = require('mongoose');
var UserModel  = mongoose.model('User');
var config     = require('config');
var UserProxy  = require('../proxy').User;
var eventproxy = require('eventproxy');
var oauthApi = require('../wechat/api_oauth');

// 验证用户是否登录
exports.authUser = function (req, res, next) {
    var ep = new eventproxy();
    ep.fail(next);

    // Ensure current_user always has defined.
    res.locals.current_user = null;

    // 先查找Session，找到直接放入locals
    if(req.session.user) {
        res.locals.current_user = req.session.user = new UserModel(req.session.user);
        return next();
    }

    var auth_token = req.signedCookies[config.auth_cookie_name];
    if (!auth_token) {
        if (req.query.code === undefined) {
            var absoluteURL = req.protocol + '://' + req.get('host') + req.originalUrl;
            var url = oauthApi.getAuthorizeURL(absoluteURL);
            res.redirect(url);
            return next();
        }
        logger.info("req.query.code:" + req.query.code);
        async.waterfall(
            [function (callback) {
                oauthApi.getAccessToken(req.query.code, function (err, result) {
                    if (err) {
                        callback(err);
                    }
                    if (result.data === undefined || result.data.openid === undefined) {
                        callback(new Error('调用微信API获取openid失败'));
                    } else {
                        callback(null, result.data.openid);
                    }
                });
            }, function (openID, callback) {
                api.getUser(openID, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result);
                    }
                });
            }], function (err, baseInfo) {
                if (err) {
                    logger.error(err);
                }
                else {
                    // Create user if new
                }
            });
    } else {
        var auth = auth_token.split('||');
        var wechat_id = auth[0];
        UserProxy.getUserByWeChatId(wechat_id, function(user){
            res.locals.current_user = req.session.user = user;
        });
    }
};

exports.gen_session = function(user, res) {
    var auth_token = user._id + '||' + user.wechatID; 
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
};