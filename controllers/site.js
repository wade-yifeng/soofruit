var config   = require('config');
var async    = require('async');

var Subject  = require('../proxy').Subject;
var Product  = require('../proxy').Product;
var Favorite = require('../proxy').Favorite;
var enums    = require('../models').Enums;
var cache    = require('../common/cache');
var logger   = require('../common/logger');

exports.index = function (req, res, next) {
    var expired = config.default_cache_time;
    async.parallel([
        function(callback){
            cache.get('subjects', function (err, subjects) {
                if(err) {
                    logger.error('获取缓存失败(Key: subjects)' + err);
                }

                if (subjects) {
                    callback(null, subjects);
                } else {
                    Subject.getActiveSubject({top: true}, {limit: config.min_subject_size, sort: 'priority'},
                        function (err, subjects) {
                            if(!err) {
                                cache.set('subjects', subjects, expired);
                            }

                            callback(err, subjects);
                        }
                    );
                }
            });
        }, function(callback){
            cache.get('spotlights', function (err, spotlights) {
                if(err) {
                    logger.error('获取缓存失败(Key: spotlights)' + err);
                }

                if (spotlights) {
                    callback(null, spotlights);
                } else {
                    Subject.getActiveSubject({spotlight: true}, {limit: config.min_spotlight_size, sort: 'priority'},
                        function (err, spotlights) {
                            if(!err) {
                                cache.set('spotlights', spotlights, expired);
                            }
                            
                            callback(err, spotlights);
                        }
                    );
                }
            });
        }
    ], function(err, results){
        if(err) {
            res.json({code: enums.ResultCode.InternalError, msg: '服务器发生异常，可以尝试联系我们的客服MM'});
            return next();
        }

        if(!results[0] || !results[0].length) {
            res.json({code: enums.ResultCode.NotFound, msg: '非常抱歉，没有找到主题'});
            return next();
        }

        if(!results[1] || !results[1].length) {
            res.json({code: enums.ResultCode.NotFound, msg: '非常抱歉，没有找到热点'});
            return next();
        }

        res.json({success: true, code: enums.ResultCode.Success, data: {subjects: results[0], spotlights: results[1]}});
    });
    
};

exports.addFavorite = function (req, res, next) {
    Favorite.add(req.body, function (err, fav) {
        if (err || !fav) {
            res.json({code: enums.ResultCode.InternalError, msg: '商品收藏失败'});
        } else {
            res.json({code: enums.ResultCode.Success, data: fav._id.toString(), msg: '商品收藏成功,可到您的个人中心查看'});
        }
    });
};

exports.removeFavorite = function (req, res, next) {
    Favorite.remove(res.locals.userID, req.params.itemID, function (err) {
        if (err) {
            res.json({code: enums.ResultCode.InternalError, msg: '商品取消收藏失败'});
        } else {
            res.json({code: enums.ResultCode.Success});
        }
    });
};