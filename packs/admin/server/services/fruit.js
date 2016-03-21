/**
 * Created by xz_liu on 2016/3/18.
 */
var Fruit = require('../../../shared/models').Fruit;
var FruitCategory = require('../../../shared/enums').FruitCategory;


module.exports.list = function (req, res) {
    Fruit.find().lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(doc);
        }
    });
};


module.exports.detail = function (req, res) {
    Fruit.findById(req.params._id).lean()
        .exec(function (err, doc) {
            if (err) {
                res.json({code: 500, message: err});
            }
            else {
                res.json(doc);
            }
        });
};


module.exports.save = function (req, res) {
    var fruit = new Fruit(req.body);

    fruit.save(function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(fruit._id.toString());
        }
    });
};


module.exports.delete = function (req, res) {
    Fruit.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json({code: 0});
        }
    });
};


module.exports.getfruitCategories = function (req, res) {
    res.send(FruitCategory);
};