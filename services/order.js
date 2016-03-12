/**
 * Created by xz_liu on 2016/3/8.
 */
var Order = require('../models').Order;


module.exports.index = function (req, res) {
    Order.find().lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(doc);
        }
    });
};


module.exports.detail = function (req, res) {
    Order.findById(req.params._id).lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(doc);
        }
    });
};


module.exports.create = function (req, res) {
    var order = new Order(req.body);

    order.save(function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(order._id.toString());
        }
    });
};


module.exports.edit = function (req, res) {
    //Not implemented.
    res.send('edit ' + req.body._id);
};


module.exports.delete = function (req, res) {
    Order.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json({code: 0});
        }
    });
};