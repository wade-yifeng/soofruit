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
    } else {
        var auth_token = req.signedCookies[config.auth_cookie_name];
        if (!auth_token) {
            var targetUrl = req.params.targetUrl;
            var absoluteURL = req.protocol + '://' + req.get('host') + req.originalUrl;
            var url = oauthApi.getAuthorizeURL(absoluteURL);
            res.redirect(url);
            return next();
        }

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