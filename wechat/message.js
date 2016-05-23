var config  = require('config');
var util    = require('util');
var async   = require('async');
var logger  = require('../common/logger');
var api     = require('./api');
var Article = require('../proxy').Article;
var User    = require('../proxy').User;
var Reply   = require('../proxy').Reply;
var tools   = require('../common/utility');
var handler = require('./handler');

// 消息分割的正则表达式
var msgReg  = /(?=\S)[^\+]+?(?=\s*(\+|$))/g;
// 消息关键字
// GZ: 获取文章关注列表
var msgTags = {'GZ': 'getArticleRecordsRank'};
// 微信消息回复
var msg = {
    'NoReply': '小北暂时还不知道你在说啥，并向你扔了个自动回复',

};

exports.text = function(message, callback) {
    if(!message.Content) {
        return callback(new Error('无法处理文本消息'));
    }

    // 征文活动的二维码生成
    if(/^ZW[0-9]+/.test(message.Content)) {
        var target = message.Content.substring(2);
        return handler.generateQRCode(target, callback);
    }

    var array = msgReg.match(message.Content);
    if(array.length !== 2) {
        return callback(null, msg.NoReply);
    }

    var content = array[0];
    var targetName = array[1];
    if(msgTags[targetName]) {
        return handler[msgTags[targetName]](content);
    }

    return handler.saveUserWisper
        async.waterfall([
            function (cb) {
                api.getUser(message.FromUserName, function (err, result) {
                    if(err) {
                        return cb(new Error('无法获取当前用户，错误：', err));
                    }
                    logger.info('当前用户');
                    logger.info(result);
                    nickName = result.nickname;
                    return cb(null, result);
                });
            }, function (baseInfo, cb) {
                User.getUserByUnionID(baseInfo.unionid, function(err, user) {
                    if(err) {
                        return cb(new Error('没有查找到当前用户，错误：', err));
                    }

                    return cb(null, user);
                });
            }, function(user, cb) {
                Reply.updateReply(
                {
                    nickName: nickName,
                    targetName: targetName,
                    msg: msg
                }, function(err, result) {
                    if(err) {
                        return cb(new Error('更新回复消息失败，错误：', err));
                    }

                    return cb(null, '小北帮你记住悄悄话了，友情提示：对同个人的悄悄话只能记得一句哦~');
                });
            }
        ], function (err, msg) {
            return callback(err, msg);   
        });
    } else {
        // 自动回复的处理
        return callback(null, '小北想偷偷告诉你，发送：想说的话+微信昵称，可以给对方发送悄悄话哦\n只能帮到这里咯 ╮(╯▽╰)╭ ');
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
    var that = this;
    var reply = 'Hi，亲爱的小主，小北在此等候多时了。这里是我们的新家，' + 
        '我们将为您提供新鲜的水果尝鲜抢购&每日热点资讯&有趣的文章&生活大发现，' + 
        '请敬请期待平台正式发布哦~\n\n发送：想说的话+微信昵称，可以给对方发送悄悄话哦，只能帮到这里咯 ╮(╯▽╰)╭ ';

    if(!message.EventKey) {
        return callback(null, reply);
    }

    // 扫描推广二维码后的关注
    if(/^qrscene_[0-9]+/.test(message.EventKey)) {
        var qrCodeID = message.EventKey.match(/\d+/)[0];

        async.waterfall([
            function(cb){
                Article.getArticleByQRCodeID(qrCodeID, function(err, article){
                    if(!!article && !!message.FromUserName) {
                        reply = reply.concat('\n\n' + 
                            util.format('首先感谢您支持%s的文章《%s》，猛戳<a href="%s">这里</a>去看看详情吧，您也可以通过我们的菜单进入征文活动哦~', 
                                article.author, article.title, article.url));
                        cb(null, message.FromUserName);
                    } else {
                        return cb(new Error("获取推广文章失败，QRCodeID:" + qrCodeID, err));
                    }
                });
            }, function (userName, cb) {
                that.createUser(userName, function(err, user, nickName) {
                    if (err) {
                        return cb(new Error("订阅时更新用户失败", err));
                    }

                    return cb(null, user, nickName);
                });
            }, function (user, nickName, cb) {
                if (!user) {
                    Article.increaseArticleRecords(qrCodeID, 
                        function(err, result) {
                            if(err) {
                                logger.error("增加推广关注失败，错误：" + err);
                            }
                            logger.info('%j', result);
                        }
                    );
                }

                nickName = !user ? nickName : user.nickName;
                logger.info("开始查找需要回复的消息" + nickName);
                Reply.getReplyByNickName(nickName, function(err, result) {
                    if(err) {
                        return cb(new Error('查找用户需要做的回复失败，错误：', err));
                    }

                    return cb(null, result);
                });
            }
        ], function (err, result) {
            if(err) {
                return callback(err);
            }
            
            reply = reply.concat('\n\n您收到了悄悄话哦，小北念给你听，咳咳：');
            result.forEach(function(item) {
                logger.info('便利悄悄话');
                logger.info('item');
                reply = reply.concat('\n' + util.format('%s想对你说：%s', 
                    item.nickName || '', item.msg));
            });
            return callback(null, reply);
        });
    } else {
        async.waterfall([
            function (cb) {
                that.createUser(message.FromUserName, function(err, user, nickName) {
                    if (err) {
                        return cb(new Error("订阅时创建用户失败", err));
                    }

                    return cb(null, user, nickName);
                });
            }, function (user, nickName, cb) {
                Reply.getReyplyByNickName(user.nickName, function(err, result) {
                    if(err) {
                        return cb(new Error('查找用户需要做的回复失败，错误：', err));
                    }

                    return cb(null, result);
                });
            }
        ], function (err, result) {
            if(err) {
                return callback(err);
            }

            reply.concat('\n\n 您收到了悄悄话哦，小北念给你听，咳咳：');
            result.forEach(function(item) {
                reply.concat('\n' + util.format('%s 想对你说：%s', 
                    item.nickName, item.msg));
            });
            return callback(null, reply);
        });
    }
};

exports.CLICK = function(message, callback) {
    if(!message.EventKey) {
        return callback(null, '系统表示一脸懵逼，主子请稍等啊！');
    }

    if(message.EventKey == "REPLY") {
        if(!message.FromUserName) {
            return callback(null, '系统表示一脸懵逼，主子请稍等啊！');
        }

        var nickName;
        async.waterfall([
            function (cb) {
                api.getUser(message.FromUserName, function (err, result) {
                    if(err) {
                        return cb(new Error('无法获取当前用户，错误：', err));
                    }
                    nickName = result.nickname;
                    return cb(null, result);
                });
            }, function (baseInfo, cb) {
                logger.info(baseInfo);
                User.getUserByUnionID(baseInfo.unionid, function(err, user) {
                    if(err) {
                        return cb(new Error('没有查找到当前用户，错误：', err));
                    }

                    return cb(null, user);
                });
            }, function(user, cb) {
                logger.info(user);
                Reply.getReplyByNickName(!!user ? user.nickName : nickName, function(err, result) {
                    if(err) {
                        return cb(new Error('查找用户需要做的回复失败，错误：', err));
                    }

                    return cb(null, result);
                });
            }
        ], function (err, result) {
                var reply = '您收到了悄悄话哦，小北念给你听，咳咳：';
                if(result && result.length) {
                    result.forEach(function(item) {
                        logger.info('遍历悄悄话');
                        logger.info(item);
                        reply = reply.concat('\n' + util.format('%s想对你说：%s', 
                            item.nickName || '', item.msg));
                    });
                }
                return callback(null, reply);  
            }
        );
    } else if(message.EventKey == "ARTICLE_RANK") {
        Article.getArticleRecordsRank(function(err, result) {
            if(err) {
                var errMsg = '读取征文排行失败，错误：';
                logger.error(errMsg + err);
                return callback(new Error(errMsg, err));
            }

            var reply = '截止' + tools.formatDate(Date.now()) + '\n';
            result.forEach(function(item) {
                reply = reply.concat(util.format('《%s》  %s  %d\n', item.title, item.author, item.records));
            });

            return callback(null, reply);
        });
    } else {
        return callback(null, '咦，咋点进来了，再宽限几天么♡o(╥﹏╥)o♡');
    }
};

/**
 * 订阅时创建用户
 * @param {Number} openID 关注用户的openID
 */
exports.createUser = function(openID, callback) {
    var nickName;
    async.waterfall([
            function (callback) {
                api.getUser(openID, function (err, result) {
                    nickName = result.nickname;
                    return callback(err, result);
                });
            }, function (baseInfo, callback) {
                User.updateUserByUnionID(baseInfo, function(err, result) {
                    logger.info('%j', result);
                    return callback(err, result);
                });
            }
        ], function (err, user) {
            callback(err, user, nickName);
        }
    );
};