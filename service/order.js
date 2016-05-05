var Order = require('../models').Order;
var enums = require('../models/enums');
var OrdersListType = enums.OrdersListType;
var OrderStatus = enums.OrderStatus;


module.exports.listPaged = function (req, res) {
    var options = {
        limit: req.query.limit ? parseInt(req.query.limit, null) : 10,
        page: req.query.page ? parseInt(req.query.page, null) : 1,
        sort: req.query.sort ? req.query.sort : '_id'
    };

    options.filters = {userID: req.query.userID};

    var listType = req.query.listType;
    if (listType && (listType != OrdersListType.All)) {
        if (listType == OrdersListType.Ongoing) {
            options.filters.status = {
                $in: [
                    OrderStatus.AwaitPay,
                    OrderStatus.Payed,
                    OrderStatus.AwaitPick
                ]
            };
        }
        else {
            options.filters.status = OrderStatus.Done;
        }
    }

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