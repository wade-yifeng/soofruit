var config  = require('config');
var util    = require('util');
var async   = require('async');
var logger  = require('../common/logger');
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

// 推广的二维码被扫描
exports.SCAN = function(message, callback) {
    if(!message.EventKey) {
        return callback(null, '系统表示一脸懵逼，主子请稍等啊！');
    }

    // 已关注用户
    if(!!message.FromUserName){
        Article.getArticleByQRCodeID(message.EventKey, function(err, article){
            if(!!article) {
                return callback(null, 
                    util.format('感谢您支持%s的文章《%s》，猛戳<a href="%s">这里</a>去看看详情吧', 
                        article.author, article.title, article.url));
            }

            return callback(null, '没有找到二维码对应的文章哦，请联系我们的小编吧');
        });
    }
};

// 关注公众号
exports.subscribe = function(message, callback) {
    var reply = 'Hi，亲爱的小主，小北在此等候多时了。这里是我们的新家，' + 
        '我们将为您提供新鲜的水果尝鲜抢购&每日热点资讯&有趣的文章&生活大发现，' + 
        '请敬请期待平台正式发布哦~';

    if(!message.EventKey) {
        return callback(null, reply);
    }

    // 扫描推广二维码后的关注
    if(/^qrscene_[0-9]+/.test(message.EventKey)) {
        var qrCodeID = message.EventKey.match(/\d+/)[0];
        Article.getArticleByQRCodeID(qrCodeID, function(err, article){
            if(!!article) {
                if(!!message.FromUserName) {
                    this.checkAndIncreaseRecords(message.FromUserName, qrCodeID);
                }
                return callback(null, reply.concat('\n\n' + 
                    util.format('首先感谢您支持%s的文章《%s》，猛戳<a href="%s">这里</a>去看看详情吧，您也可以通过我们的菜单进入征文活动哦~', 
                        article.author, article.title, article.url)));
            }

            return callback(null, reply);
        });
    }
};


/**
 * 根据被推荐的关注用户信息来判断并增加推广记录
 * @param {Number} openID 关注用户的openID
 * @param {Number} qrCodeID 推广二维码编号
 */
exports.checkAndIncreaseRecords = function(openID, qrCodeID) {
    // api.getUser(openID, function (err, result) {
    //     if()
    //     User.updateUserByUnionID(baseInfo);
    // });
};