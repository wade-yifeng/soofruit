var Settle = require('../models').Settle;


module.exports.list = function (req, res) {
    Settle.find().lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0, data: doc});
        }
    });
};


module.exports.create = function (req, res) {
    var settle = new Settle(req.body);
    settle.save(function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0, data: settle._id.toString()});
        }
    });
};


/**
 * 查询某个订单的结算记录
 */
module.exports.ofOrder = function (req, res) {
    Settle.find({orderID: req.params.orderID}).lean()
        .exec(function (err, doc) {
            if (err) {
                res.json({code: 500, msg: err});
            }
            else {
                res.json({code: 0, data: doc});
            }
        });
};