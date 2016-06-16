var config     = require('config');
var async      = require('async');

var Subject    = require('../proxy').Subject;
var Product    = require('../proxy').Product;
var Favorite   = require('../proxy').Favorite;
var cache      = require('../common/cache');
var logger     = require('../common/logger');
var ResultCode = require('../models/enums').ResultCode;
var ErrorMsg   = require('../models/enums').ErrorMessage;

exports.getOrSetCache = function (key, getMethod, callback) {
    cache.get(key, function (err, items) {
        if(err) {
            logger.error(util.format(ErrorMsg.RedisErrorFormat, "获取" + key, err));
            return callback(err);
        }

        if (items) {
            return callback(null, items);
        } 

        getMethod(callback);
    });
};

exports.home = function (req, res, next) {
    var expired = config.default_cache_time;
    async.parallel([
        function(callback) {
            exports.getOrSetCache('subjects', function(callback) {
                Subject.getActiveSubject({top: true}, 
                    {limit: config.max_subject_size, sort: 'priority'},
                    function (err, subjects) {
                        if(!err) {
                            cache.set('subjects', subjects, expired);
                        }

                        callback(err, subjects);
                    }
                );
            }, callback);
        }, function(callback){
            exports.getOrSetCache('spotlights', function(callback) {
                Subject.getActiveSubject({spotlight: true}, 
                    {limit: config.max_spotlight_size, sort: 'priority'},
                    function (err, spotlights) {
                        if(!err) {
                            cache.set('spotlights', spotlights, expired);
                        }
                        
                        callback(err, spotlights);
                    }
                );
            }, callback);
        }, function(callback){
            exports.getOrSetCache('express', function(callback) {
                Product.getActiveProducts({ tags: "express" }, 
                    {limit: config.max_express_size, sort: '-lastUpdateTime'},
                    function (err, products) {
                        if(!err) {
                            cache.set('express', products, expired);
                        }

                        callback(err, products);
                    }
                );
            }, callback);
        }
    ], function(err, results){
        if(err) {
            res.json({code: ResultCode.InternalError, msg: '服务器发生异常，可以尝试联系我们的客服MM'});
            return next();
        }

        if(!results[0] || !results[0].length) {
            res.json({code: ResultCode.NotFound, msg: '首页加载异常，没有找到轮播主题'});
            return next();
        }

        if(!results[1] || !results[1].length) {
            res.json({code: ResultCode.NotFound, msg: '首页加载异常，没有找到热门活动'});
            return next();
        }

        if(!results[2] || !results[2].length) {
            res.json({code: ResultCode.NotFound, msg: '首页加载异常，没有找到新品推荐'});
            return next();
        }

        res.json({success: true, code: ResultCode.Success, 
            data: {subjects: results[0], spotlights: results[1], express: results[2]}});
    });
    
};

exports.addFavorite = function (req, res, next) {
    Favorite.add(req.body, function (err, fav) {
        if (err || !fav) {
            res.json({code: ResultCode.InternalError, msg: '商品收藏失败'});
        } else {
            res.json({code: ResultCode.Success, data: fav._id.toString(), msg: '商品收藏成功,可到您的个人中心查看'});
        }
    });
};

exports.removeFavorite = function (req, res, next) {
    Favorite.remove(res.locals.userID, req.params.itemID, function (err) {
        if (err) {
            res.json({code: ResultCode.InternalError, msg: '商品取消收藏失败'});
        } else {
            res.json({code: ResultCode.Success});
        }
    });
};