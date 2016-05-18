var mongoose  = require('mongoose');
var UserModel = mongoose.model('User');
var config    = require('config');
var UserProxy = require('../proxy').User;
var logger    = require('../common/logger');

// 验证用户是否登录
exports.authUser = function (req, res, next) {
    if (/^\/assets/.test(req.url) || /^\/views\/section/.test(req.url) || /^\/wechat/.test(req.url)) {
        return next();
    }
    
    // Ensure current_user always has defined.
    res.locals.current_user = null;

    // 先查找Session，找到直接放入locals
    if(req.session.user) {
        var userModel = new UserModel(req.session.user);
        logger.info('在session中找到了用户:' + userModel);
        res.locals.current_user = req.session.user = userModel;
        res.locals.userID = req.session.userID = userModel._id;
        return next();
    }

    // 查找浏览器Cookie
    var auth_token = req.signedCookies[config.auth_cookie_name];
    if (auth_token) {
        var auth = auth_token.split('||');
        var unionID = auth[0];
        UserProxy.getUserByUnionID(unionID, function(err, user){
            if(!err) {
                logger.info('在cookie中找到了用户:' + user);
                res.locals.current_user = req.session.user = user;
                res.locals.userID = req.session.userID = user._id;
            }
        });
        return next();
    }

    var isLogin = !!req.session.targetUrl;
    
    req.session.targetUrl = !/^\/login/.test(req.url) ? 
        req.protocol + '://' + req.get('host') + req.originalUrl : 
        req.protocol + '://' + req.get('host');

    if(isLogin) {
        return next();
    }
    
    res.redirect('/login');
};

// 目前只是以微信端unionid作为Session
exports.gen_session = function(user, res) {
    var auth_token = user.unionid + '||'; 
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
};