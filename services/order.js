/**
 * Created by xz_liu on 2016/3/8.
 */
var mongoose = require('mongoose');
var Order = require('../models').Order;


module.exports.index = function (req, res, next) {
    res.send('get list');
};


module.exports.detail = function (req, res, next) {
    Order.findById(req.params._id).lean().exec(function (err, doc) {
        if (err) {
            res.json({
                code: 500,
                message: err
            });
        }
        else {
            res.json(doc);
        }
    });
};


module.exports.create = function (req, res, next) {
    var order = new Order(
        {
            customer: req.body.customer,
            amount: req.body.amount,
            delivery_date: new Date(req.body.amount.delivery_date),
            fruits: req.body.fruits
        });

    order.save(function (err) {
        if (err) {
            res.json({
                code: 500,
                message: err
            });
        }
        else {
            res.json(order._id.toString());
        }
    });
};


module.exports.edit = function (req, res, next) {
    res.send('edit ' + req.body._id);
};


module.exports.delete = function (req, res, next) {
    res.send('delete' + req.body._id);
};