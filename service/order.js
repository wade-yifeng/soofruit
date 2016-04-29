var Order = require('../models').Order;


module.exports.listPaged = function (req, res) {
    var options = {
        limit: req.query.limit ? parseInt(req.query.limit, null) : 10,
        page: req.query.page ? parseInt(req.query.page, null) : 1,
        sort: req.query.sort ? req.query.sort : '_id'
    };

    Order.pagedFind(options, function (err, doc) {
        if (err) {
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 0, data: doc});
        }
    });
};


module.exports.create = function (req, res) {
    var order = new Order(req.body);

    order.save(function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        } else if (!order) {
            res.json({code: 100, msg: '订单创建失败'});
        } else {
            res.json({code: 0, data: order._id.toString()});
        }
    });
};


module.exports.detail = function (req, res) {
    Order.findById(req.params._id).lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 0, data: doc});
        }
    });
};


module.exports.update = function (req, res) {
    Order.findById(req.params._id, function (err, doc) {
        if (!doc) {
            res.json({code: 100, msg: "订单不存在或已被删除"});
        } else {
            Order.update({_id: req.params._id}, req.body, function (err) {
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
    Order.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 0});
        }
    });
};