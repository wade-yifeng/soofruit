var oauthApi = require('../wechat/api_oauth');
var api = require('../wechat/api');
var async = require('async');
var user = require('./user');
var logger = require('../lib/logger');

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
                    user.getByWechatID(baseInfo.unionid).then(function (result) {
                            if (result.code == 0) {
                                var entity = {
                                    wechatID: baseInfo.unionid,
                                    nickName: baseInfo.nickname,
                                    sex: baseInfo.sex,
                                    country: baseInfo.country,
                                    province: baseInfo.province,
                                    city: baseInfo.city,
                                    headImg: baseInfo.headimgurl,
                                    remark: baseInfo.remark,
                                    subcribeTime: new Date(baseInfo.subscribe_time * 1000),
                                    lastLoginTime: Date.now(),
                                    username: '',
                                    tag: '',
                                    mobile: '',
                                    points: 0,
                                    isBlocked: false
                                };

                                if (!result.data) {
                                    //系统无此用户,则注册到系统中
                                    user.create(entity).then(function (result) {
                                        if (result.code != 0) {
                                            logger.error(result.msg);
                                        } else {
                                            //创建后将_id更新到Session中
                                            req.session.fake.user._id = result.data;
                                        }
                                    });
                                } else {
                                    //数据如有变化,则更新到系统中
                                    entity._id = result.data._id;
                                    entity.username = result.data.username;
                                    entity.tag = result.data.tag;
                                    entity.mobile = result.data.mobile;
                                    entity.points = result.data.points;
                                    entity.isBlocked = result.data.isBlocked;

                                    user.update(entity).then(function (result) {
                                        if (result.code != 0) {
                                            logger.error(result.msg);
                                        }
                                    });
                                }

                                //不等待数据库更改操作,直接设置Session
                                entity.lastLoginTime = new Date(entity.lastLoginTime);
                                setUserSession(req, entity);

                                //加一个url是/account的判断,以使测试微信post能正常运行,后期需要去掉
                                if (req.originalUrl == '/account') {
                                    res.status(200).send(baseInfo);
                                } else {
                                    res.redirect(targetUrl);
                                }
                            } else {
                                logger.error(result.msg);
                            }
                        }
                    );
                }
            });
    }
};

function setUserSession(req, entity) {
    if (!req.session.fake) {
        req.session.fake = {};
    }
    req.session.fake.user = entity;
}

module.exports.getUserSession = function (req, res) {
    if (req.session && req.session.fake && req.session.fake.user) {
        res.json({code: 0, data: req.session.fake.user});
        return;
    }
    res.json({code: 1, msg: '请求的session不存在'});
};