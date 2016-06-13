var config     = require('config');
var util       = require('util');
var async      = require('async');
var api        = require('./api');
var EventProxy = require('../common/event_proxy');
var tools      = require('../common/utility');
var logger     = require('../common/logger');
var ErrorMsg   = require('../models/enums').ErrorMessage;
var Article    = require('../proxy').Article;
var User       = require('../proxy').User;
var Reply      = require('../proxy').Reply;

// 微信消息回复
var msgReply = {
    'QRCodeTitle': '快来关注%d吧',
    'QRCodeDescription': '打开页面获取完整二维码，开始扫码推广！',
    'WisperReply': '小北帮你记住悄悄话了，友情提示：对同个人的悄悄话只能记得一句哦~',
    'ScanWithoutArticle': '没有找到二维码对应的文章哦，请联系我们的小编吧~',
    'ScanArticleSuccess': '感谢您支持%s的文章《%s》，猛戳<a href="%s">这里</a>去看看详情吧',
    'SubscribeReply': 'Hi，亲爱的小主，小北在此等候多时了。这里是我们的新家，' + 
        '我们将为您提供新鲜的水果尝鲜抢购&每日热点资讯&有趣的文章&生活大发现，' + 
        '请敬请期待平台正式发布哦~\n\n发送：想说的话+微信昵称（已关注），可以给对方发送悄悄话哦，只能帮到这里咯 ╮(╯▽╰)╭ ',
    'ThanksFollowArticle': '\n\n首先感谢您支持%s的文章《%s》，猛戳<a href="%s">这里</a>去看看详情吧，您也可以通过我们的菜单进入征文活动哦~',
    'NoWisperReply': '您并没有收到悄悄话，发送：想说的话+微信昵称（已关注），可以给对方发送悄悄话哦'
};

/**
 * 生成推广关注二维码
 * Callback:
 * - err, 生成（读取）二维码异常
 * - msg, 自动回复消息
 * @param {String} qrCodeID 推广二维码场景ID
 */
exports.generateQRCode = function(qrCodeID, callback) {
    async.waterfall([
        function (cb) {
            Article.getArticleByQRCodeID(qrCodeID, cb);
        }, function (article, cb) {
            if(!article) {
                api.createTmpQRCode(qrCodeID, config.WeChat.qrCodeExpire,
                    function(err, result) {
                        if(err) {
                            return cb(err);
                        }

                        var qrCodeURL = api.showQRCodeURL(result.ticket);
                        return cb(null, false, qrCodeURL);
                    }
                );
            } else {
                cb(null, true, article.qrCodeURL);
            }
        }
    ], function (err, existed, qrCodeURL) {
        if (err) {
            logger.error(util.format(ErrorMsg.GeneralErrorFormat, "生成二维码", err));
            return callback(err);
        }

        // run as async
        if (!existed) {
            Article.createArticleWithQRCode(qrCodeID, qrCodeURL,
                function(err) {
                    if(err) {
                        logger.error(util.format(ErrorMsg.DBErrorFormat, "创建推广二维码对应的文章", err));
                    }
                }
            );
        }

        return callback(null, [{
            title: util.format(msgReply.QRCodeTitle, qrCodeID),
            description: msgReply.QRCodeDescription,
            picurl: qrCodeURL,
            url: qrCodeURL
        }]);
    });
};

/**
 * 保存用户悄悄话
 * Callback:
 * - err, 更新悄悄话推送异常
 * - msg, 自动回复消息
 * @param {String} openID 目标用户的OPNEID
 * @param {String} targetName 推送目标的微信昵称
 * @param {String} content 推送消息的内容
 */
exports.saveUserWisper = function(openID, targetName, content, callback) {
    async.waterfall([
        function (cb) {
            api.getUser(openID, cb);
        }, function(baseInfo) {
            // getUser返回不止一个参数,获取最后一个callback参数
            var cb = arguments[arguments.length - 1];
            Reply.updateReply(
            {
                nickName: baseInfo.nickname,
                targetName: targetName,
                msg: content
            }, cb);
        }
    ], function (err) {
        if (err) {
            logger.error(util.format(ErrorMsg.GeneralErrorFormat, "更新悄悄话推送", err));
            return callback(err);
        }

        return callback(null, msgReply.WisperReply);   
    });
};

/**
 * 推广的二维码被扫描
 * Callback:
 * - err, 获取二维码对应信息异常
 * - msg, 自动回复消息
 */
exports.SCAN = function(message, callback) {
    // TODO: 目前只支持有事件Key和已关注用户的扫描
    if(!message.EventKey || !message.FromUserName) {
        return callback(new Error('目前只支持有事件Key和已关注用户的扫描'));
    }

    Article.getArticleByQRCodeID(message.EventKey, function(err, article){
        if (err) {
            logger.error(util.format(ErrorMsg.GeneralErrorFormat, "根据推广二维码ID查找文章", err));
            return callback(err);
        }

        return callback(null, !article ? msgReply.ScanWithoutArticle : 
            util.format(msgReply.ScanArticleSuccess, 
                article.author, article.title, article.url));
    });
};

/**
 * 订阅服务号
 * Callback:
 * - err, 获取二维码对应信息异常
 * - msg, 自动回复消息
 */
exports.subscribe = function(message, callback) {
    var that = this;

    if(!message.FromUserName) {
        return callback(new Error('订阅事件没有获取到FromUserName'));
    }

    var reply = msgReply.SubscribeReply;

    var ep = EventProxy.create();
    
    ep.on('user', function (qrscene) {
        async.waterfall([
            function (cb) {
                api.getUser(message.FromUserName, cb);
            }, function (baseInfo) {
                var cb = arguments[arguments.length - 1];
                User.updateUserByUnionID(baseInfo, function(err, result) {
                    return cb(err, !!result, baseInfo.nickname);
                });
            }, function (flag, nickName, cb) {
                if (qrscene && !flag) {
                    Article.increaseArticleRecords(qrCodeID, function(err) {
                        if(err) {
                            logger.error(util.format(ErrorMsg.DBErrorFormat, "增加推广关注失败", err));
                        }
                    });
                }
        
                Reply.getReplyByNickName(nickName, cb);
            }
        ], function (err, result) {
            if(err) {
                logger.error(util.format(ErrorMsg.GeneralErrorFormat, "扫描推广二维码后的关注", err));
                return callback(err);
            }
            
            if(result && result.length > 0) {
                reply = reply.concat('\n\n您收到了悄悄话哦，小北念给你听，咳咳：');
                result.forEach(function(item) {
                    reply = reply.concat('\n' + util.format('%s想对你说：%s', 
                        item.nickName || '', item.msg));
                });
            }
            return callback(null, reply);
        });
    });

    // 扫描推广二维码后的关注
    if(/^qrscene_[0-9]+/.test(message.EventKey)) {
        var qrCodeID = message.EventKey.match(/\d+/)[0];

        return Article.getArticleByQRCodeID(qrCodeID, function(err, article){
            if(err || !article) {
                return cb(new Error("获取推广文章失败，QRCodeID:" + qrCodeID, err));
            }

            reply = reply.concat(util.format(msgReply.ThanksFollowArticle, 
                article.author, article.title, article.url));

            ep.emit('user', true);
        });
    }

    ep.emit('user');
};

exports.CLICK = function(message, callback) {
    if(!message.EventKey || !message.FromUserName) {
        return callback(new Error('点击事件未包含EventKey或没有获取到FromUserName'));
    }

    if(message.EventKey == "REPLY") {
        return async.waterfall([
            function (cb) {
                api.getUser(message.FromUserName, cb);
            }, function(baseInfo) {
                var cb = arguments[arguments.length - 1];
                Reply.getReplyByNickName(baseInfo.nickname, cb);
            }
        ], function (err, result) {
            if(err) {
                logger.error(util.format(ErrorMsg.GeneralErrorFormat, "查看用户悄悄话留言", err));
                return callback(err);
            }

            var reply = msgReply.NoWisperReply;
            if(result && result.length) {
                reply = '您收到了悄悄话哦，小北念给你听，咳咳：';
                result.forEach(function(item) {
                    logger.info('遍历悄悄话');
                    logger.info(item);
                    reply = reply.concat('\n' + util.format('%s想对你说：%s', 
                        item.nickName || '', item.msg));
                });
            }
            return callback(null, reply);  
        });
    }

    if(message.EventKey == "ARTICLE_RANK") {
        return Article.getArticleRecordsRank(function(err, result) {
            if(err) {
                logger.error(util.format(ErrorMsg.DBErrorFormat, "读取征文排行", err));
                return callback(err);
            }

            if(result) {
                var reply = '截止' + tools.formatDate(Date.now()) + '\n';
                result.forEach(function(item) {
                    reply = reply.concat(util.format('《%s》  %s  %d\n', item.title, item.author, item.records));
                });

                return callback(null, reply);
            }

            return callback(new Error('没有读取到征文数据'));
        });
    } 

    return callback(null, '咦，咋点进来了，再宽限几天么♡o(╥﹏╥)o♡');
};