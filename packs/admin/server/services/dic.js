/**
 * Created by xz_liu on 2016/3/18.
 */
var Dic = require('../models/dic').Dic;


module.exports.list = function (req, res) {
    Dic.find().lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(doc);
        }
    });
};


module.exports.detail = function (req, res) {
    Dic.findById(req.params._id).lean()
        .exec(function (err, doc) {
            if (err) {
                res.json({code: 500, message: err});
            }
            else {
                res.json(doc);
            }
        });
};


module.exports.create = function (req, res) {
    var dic = new Dic(req.body);

    dic.save(function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(dic._id.toString());
        }
    });
};


module.exports.edit = function (req, res) {
    //Not implemented.
    res.send('edit ' + req.body._id);
};


module.exports.delete = function (req, res) {
    Dic.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json({code: 0});
        }
    });
};


module.exports.getDicTypes = function (req, res) {
    Dic.find({Type: 'DicType'}, {_id: 0, Name: 1}).lean()
        .exec(function (err, doc) {
            if (err) {
                res.json({code: 500, message: err});
            }
            else {
                res.json(doc);
            }
        });
};