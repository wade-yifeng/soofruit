var config     = require('config');
var async      = require('async');

var Subject    = require('../proxy').Subject;
var Product    = require('../proxy').Product;
var Favorite   = require('../proxy').Favorite;
var cache      = require('../common/cache');
var logger     = require('../common/logger');
var ResultCode = require('../models/enums').ResultCode;
var ErrorMsg   = require('../models/enums').ErrorMessage;

exports.expired = config.default_cache_time;

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

exports.getActivities = function (req, res) {
    async.parallel([
        function(callback) {
            exports.getOrSetCache('subjects', function(callback) {
                Subject.getActiveSubject({top: true}, 
                    {limit: config.max_subject_size, sort: 'priority'},
                    function (err, subjects) {
                        if(!err) {
                            cache.set('subjects', subjects, exports.expired);
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
                            cache.set('spotlights', spotlights, exports.expired);
                        }
                        
                        callback(err, spotlights);
                    }
                );
            }, callback);
        }, function(callback){
            exports.getOrSetCache('express', function(callback) {
                Product.getActiveProducts({ tags: "express" }, 
                    {skip: 0, limit: config.max_express_size, sort: '-lastUpdateTime'},
                    function (err, products) {
                        if(!err) {
                            cache.set('express', products, exports.expired);
                        }

                        callback(err, products);
                    }
                );
            }, callback);
        }
    ], function(err, results){
        if(err) {
            return res.json({code: ResultCode.InternalError, msg: '服务器发生异常，可以尝试联系我们的客服MM'});
        }

        if(!results[0] || !results[0].length) {
            return res.json({code: ResultCode.NotFound, msg: '首页加载异常，没有找到轮播主题'});
        }

        if(!results[1] || !results[1].length) {
            return res.json({code: ResultCode.NotFound, msg: '首页加载异常，没有找到热门活动'});
        }

        if(!results[2] || !results[2].total) {
            return res.json({code: ResultCode.NotFound, msg: '首页加载异常，没有找到新品推荐'});
        }

        res.json({success: true, code: ResultCode.Success, 
            data: {subjects: results[0], spotlights: results[1], express: results[2].docs}});
    });  
};

exports.getProductList = function (req, res) {
    var skip = (req.query.page_index || 0) * config.max_page_size;
    var callback = function(err, result) {
        res.json({success: true, code: ResultCode.Success,
            data: {products: result.docs, totalPage: result.total % config.max_page_size ? parseInt(result.total / config.max_page_size) + 1 : parseInt(result.total / config.max_page_size) }});
    };
    if(skip === 0) {
        exports.getOrSetCache('products', function(callback) {
            Product.getActiveProducts({ tags: "item" }, 
                { skip: 0, limit: config.max_page_size, sort: '-lastUpdateTime'},
                function (err, result) {
                    if(!err && result) {
                        cache.set('products', result, exports.expired);
                    }

                    callback(err, result);
                }
            );
        }, callback);
    } else {
        Product.getActiveProducts({ tags: "item" },
            { skip: skip, limit: config.max_page_size, sort: '-lastUpdateTime'},
            function (err, result) {
                if(!err && result) {
                    cache.set('products', result, exports.expired);
                }

                callback(err, result);
            }
        );
    }
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