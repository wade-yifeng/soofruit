var models = require('../models');
var Address = models.Address;


module.exports.list = function (req, res) {
    var userID = req.params.userID;
    Address.find({userID: userID}, function (err, doc) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0, data: doc});
        }
    });
};


module.exports.create = function (req, res) {
    //var v = ValidateAddress(req.body);
    //if (!v.isValid()) {
    //    res.json({code: 400, msg: v.msgs});
    //}
    //else {
        var address = new Address(req.body);

        address.save(function (err) {
            if (err) {
                res.json({code: 500, msg: err});
            }
            else if (!address) {
                res.json({code: 100, msg: '地址创建失败'});
            }
            else {
                res.json({code: 0, data: address._id.toString()});
            }
        });
    //}
};


module.exports.detail = function (req, res) {
    Address.findById(req.params._id).lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0, data: doc});
        }
    });
};


module.exports.update = function (req, res) {
    Address.findById(req.params._id, function (err, doc) {
        if (!doc) {
            res.json({code: 100, msg: "商品不存在或已被删除"});
        } else {
            //var v = ValidateAddress(req.body);
            //if (!v.isValid()) {
            //    res.json({code: 400, msg: v.msgs});
            //}
            //else {
                Address.update({_id: req.params._id}, req.body, function (err) {
                    if (err) {
                        res.json({code: 500, msg: err});
                    }
                    else {
                        res.json({code: 0});
                    }
                });
            //}
        }
    });
};


module.exports.delete = function (req, res) {
    Address.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0});
        }
    });
};