var Coupon = require('../models').Coupon;


module.exports.list = function (req, res) {
    var filters = req.query.type ? {type: req.query.type} : {};

    Coupon.find(filters).sort('amount').lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0, data: doc});
        }
    });
};


module.exports.detail = function (req, res) {
    Coupon.findById(req.params._id).lean()
        .exec(function (err, doc) {
            if (err) {
                res.json({code: 500, msg: err});
            }
            else {
                res.json({code: 0, data: doc});
            }
        });
};


module.exports.create = function (req, res) {
    var coupon = new Coupon(req.body);
    coupon.save(function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0, data: coupon._id.toString()});
        }
    });
};


module.exports.update = function (req, res) {
    Coupon.update({_id: req.params._id}, req.body, function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0});
        }
    });
};


module.exports.delete = function (req, res) {
    Coupon.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0});
        }
    });
};