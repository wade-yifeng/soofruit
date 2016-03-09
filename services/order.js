/**
 * Created by xz_liu on 2016/3/8.
 */
var mongoose = require('mongoose');
var Order = require('../models').Order;

module.exports.index = function (req, res, next) {
    res.send('get list');
};

module.exports.detail = function (req, res, next) {
    res.send('get single ' + req.params._id);
};

module.exports.create = function (req, res, next) {
    var order = new Order(
        {
            customer: req.body.customer,
            amount: req.body.amount,
            delivery_date: req.body.amount.delivery_date,
            items: req.body.items
        });
    var res = order.save();
    res.json(res);
};

module.exports.edit = function (req, res, next) {
    res.send('edit ' + req.body._id);
};

module.exports.delete = function (req, res, next) {
    res.send('delete' + req.body._id);
};