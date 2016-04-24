var oauthApi = require('../wechat/api_oauth');
var api = require('../wechat/api');
var async = require('async');
var logger = require('../lib/logger');
var Q = require('q');

module.exports.signin = function (req, res) {
    if (req.session && req.session['fake'] && req.session['fake'].info) {
        return;
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
                    return;
                }

                getUserByUnionid(baseInfo.unionid).then(function (user) {
                    if (!user) {
                        //注册微信用户到系统中
                    }
                    if (!req.session['fake']) {
                        req.session['fake'] = {};
                    }
                    req.session['fake'].info = baseInfo;
                });

                res.status(200).send(baseInfo);
            }
        );
    }
};

module.exports.getUserSession = function (req, res) {
    if (req.session && req.session['fake']) {
        res.json({code: 0, data: req.session['fake'].info});
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