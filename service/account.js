var oauthApi = require('../wechat/api_oauth');
var api = require('../wechat/api');
var async = require('async');
var logger = require('../lib/logger');
var Q = require('q');

module.exports.signin = function (req, res) {
    var targetUrl = req.params.targetUrl;

    if (req.session && req.session.fake && req.session.fake.user) {
        //加一个url是/account的判断,以使测试微信post能正常运行,后期需要去掉
        if (req.originalUrl == '/account') {
            res.status(200).send(req.session.fake.user);
        } else {
            res.redirect(targetUrl);
        }
        return;
    }

    if (req.originalUrl != '/account') {

    }

    if (req.query.code === undefined) {
        var absoluteURL = req.protocol + '://' + req.get('host') + req.originalUrl;
        var url = oauthApi.getAuthorizeURL(absoluteURL);
        res.redirect(url);
    }
    else {
        async.waterfall(
            [function (callback) {
                oauthApi.getAccessToken(req.query.code, function (err, result) {
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
                    //getUserByUnionid(baseInfo.unionid).then(function (user) {
                    //    if (!user) {
                    //        //注册微信用户到系统中
                    //    }
                    //    if (!req.session['fake']) {
                    //        req.session['fake'] = {};
                    //    }
                    //    req.session['fake'].user = baseInfo;
                    //});

                    if (!req.session.fake) {
                        req.session.fake = {};
                    }
                    req.session.fake.user = baseInfo;

                    //加一个url是/account的判断,以使测试微信post能正常运行,后期需要去掉
                    if (req.originalUrl == '/account') {
                        res.status(200).send(baseInfo);
                    } else {
                        res.redirect(targetUrl);
                    }
                }
            });
    }
};

module.exports.getUserSession = function (req, res) {
    if (req.session && req.session.fake && req.session.fake.user) {
        res.json({code: 0, data: req.session.fake.user});
        return;
    }
    res.json({code: 1, msg: '请求的session不存在'});
};

var getUserByUnionid = function (unionid) {
    var defer = Q.defer();
    User.findOne({unionid: unionid}).lean().exec(function (err, doc) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(doc);
        }
    });
    return defer.promise;
};