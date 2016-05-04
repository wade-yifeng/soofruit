var models = require('../models');
var Favorite = models.Favorite;
var Good = models.Good;


module.exports.listSimple = function (req, res) {
    Favorite.find({userID: req.params.userID}).lean().exec(function (err, favList) {
        if (err) {
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 0, data: favList});
        }
    });
};


module.exports.listIntact = function (req, res) {
    Favorite.find({userID: req.params.userID}).lean().exec(function (err, favList) {
        if (err) {
            res.json({code: 500, msg: err});
        } else {
            var goodIDList = favList.map(function (fav) {
                return fav.goodID;
            });
            Good.find({_id: {$in: goodIDList}}).lean().exec(function (err, goods) {
                if (err) {
                    res.json({code: 500, msg: err});
                } else {
                    res.json({code: 0, data: goods});
                }
            });
        }
    });
};


module.exports.create = function (req, res) {
    var fav = new Favorite(req.body);

    fav.save(function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        } else if (!fav) {
            res.json({code: 100, msg: '商品收藏失败'});
        } else {
            res.json({code: 0, data: fav._id.toString(), msg: '商品收藏成功,可到您的个人中心查看'});
        }
    });
};


module.exports.delete = function (req, res) {
    Favorite.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 0});
        }
    });
};