/**
 * Created by xz_liu on 2016/3/18.
 */
var fs = require('fs');
var path = require('path');
var models = require('../../../shared/models');
var Good = models.Good;
var ValidateGood = models.ValidateGood;
var uploadPath = require('config').UploadDir.substr(2);
var GoodCategory = require('../../../shared/enums').GoodCategory;


module.exports.list = function (req, res) {
    var conditions = {};
    if (req.query.category) {
        conditions.category = req.query.category;
    }

    Good.find(conditions)
        .lean()
        .exec(function (err, doc) {
            if (err) {
                res.json({code: 500, message: err});
            }
            else {
                res.json(doc);
            }
        });
};


module.exports.listPaged = function (req, res) {
    var options = {
        limit: req.query.limit ? parseInt(req.query.limit, null) : 10,
        page: req.query.page ? parseInt(req.query.page, null) : 1,
        sort: req.query.sort ? req.query.sort : '_id'
    };

    Good.pagedFind(options, function (err, doc) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(doc);
        }
    });
};


module.exports.create = function (req, res) {
    var v = ValidateGood(req.body);
    if (!v.isValid()) {
        res.json({code: 400, msgs: v.msg});
    }
    else {
        var good = new Good(req.body);

        good.save(function (err) {
            if (err) {
                res.json({code: 500, message: err});
            }
            else if (!good) {
                res.json({code: 500, message: '商品创建失败'});
            }
            else {
                res.json(good._id.toString());
            }
        });
    }
};


module.exports.detail = function (req, res) {
    Good.findById(req.params._id)
        .lean()
        .exec(function (err, doc) {
            if (err) {
                res.json({code: 500, message: err});
            }
            else {
                res.json(doc);
            }
        });
};


module.exports.update = function (req, res) {
    Good.update({_id: req.params._id}, req.body, function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json({code: 0});
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

            //同时异步删掉所有无用图片文件
            Good.find({}, 'pics')
                .lean()
                .exec(function (err, doc) {
                    if (!err) {
                        var dbPics = [];
                        doc.forEach(function (item) {
                            dbPics.push.apply(dbPics, item.pics);
                        });

                        var allPics = fs.readdirSync(path.resolve(uploadPath));
                        allPics.forEach(function (pic) {
                            if (dbPics.indexOf(pic) == -1) {
                                fs.unlink(path.resolve(uploadPath, pic));
                            }
                        });
                    }
                });
        }
    });
};


module.exports.getgoodCategories = function (req, res) {
    res.send(GoodCategory);
};


module.exports.uploadPics = function (req, res) {
    //截去路径assets/imgs/upload/,仅保留文件名
    var srcPath = req.files.file.path.substr(19);
    res.send(srcPath);
};


module.exports.deletePic = function (req, res) {
    fs.unlink(path.resolve(uploadPath, req.params._path), function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json({code: 0});
        }
    });
};