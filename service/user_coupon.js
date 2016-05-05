var UserCoupon = require('../models').UserCoupon;


module.exports.listPaged = function (req, res) {
    var options = {
        limit: req.query.limit ? parseInt(req.query.limit, null) : 10,
        page: req.query.page ? parseInt(req.query.page, null) : 1,
        sort: req.query.sort ? req.query.sort : '_id'
    };

    options.filters = {status: req.query.status};

    UserCoupon.pagedFind(options, function (err, doc) {
        if (err) {
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 0, data: doc});
        }
    });
};


module.exports.create = function (req, res) {
    var userCoupon = new UserCoupon(req.body);

    userCoupon.save(function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        } else if (!userCoupon) {
            res.json({code: 100, msg: '用户优惠券添加失败'});
        } else {
            res.json({code: 0, data: userCoupon._id.toString(), msg:'恭喜您获得一个优惠券,可到您的个人中心查看'});
        }
    });
};


module.exports.detail = function (req, res) {
    UserCoupon.findById(req.params._id).lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 0, data: doc});
        }
    });
};


module.exports.update = function (req, res) {
    UserCoupon.findById(req.params._id, function (err, doc) {
        if (!doc) {
            res.json({code: 100, msg: "用户优惠券不存在或已被删除"});
        } else {
            UserCoupon.update({_id: req.params._id}, req.body, function (err) {
                if (err) {
                    res.json({code: 500, msg: err});
                } else {
                    res.json({code: 0});
                }
            });
        }
    });
};


module.exports.delete = function (req, res) {
    UserCoupon.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 0});
        }
    });
};