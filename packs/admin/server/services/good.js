/**
 * Created by xz_liu on 2016/3/18.
 */
var Good = require('../../../shared/models').Good;
var GoodCategory = require('../../../shared/enums').GoodCategory;


module.exports.list = function (req, res) {
    Good.find().lean().exec(function (err, doc) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(doc);
        }
    });
};


module.exports.detail = function (req, res) {
    Good.findById(req.params._id).lean()
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
    var good = new Good(req.body);
    
    good.save(function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(good._id.toString());
        }
    });
};


module.exports.delete = function (req, res) {
    Good.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json({code: 0});
        }
    });
};


module.exports.getgoodCategories = function (req, res) {
    res.send(GoodCategory);
};


module.exports.uploadPics = function (req, res) {
    //截去开头的assets.原始路径举例:assets/imgs/upload/tm4HP8x0RDH2PGpCb7htcQyD.jpg
    var srcPath = req.files.file.path.substr(6);
    res.send(srcPath);
};