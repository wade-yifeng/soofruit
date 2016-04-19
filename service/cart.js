var Cart = require('../models').Cart;


module.exports.create = function (req, res) {
    var cart = new Cart(req.body);

    cart.save(function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else if (!cart) {
            res.json({code: 500, msg: '购物车创建失败'});
        }
        else {
            res.json({code: 0, data: cart});
        }
    });
};


module.exports.detail = function (req, res) {
    Cart.findOne({userID: req.params.userID}).lean()
        .exec(function (err, doc) {
            if (err) {
                res.json({code: 500, msg: err});
            }
            else {
                res.json({code: 0, data: doc});
            }
        });
};


module.exports.update = function (req, res) {
    Cart.update({userID: req.params.userID}, req.body, function (err) {
        if (err) {
            res.json({code: 500, msg: err});
        }
        else {
            res.json({code: 0});
        }
    });
};


module.exports.getCartSession = function (req, res) {
    var userID = req.params._id;
    if (req.session && req.session[userID]) {
        res.json({code: 0, data: req.session[userID]});
        return;
    }
    res.json({code: 1, msg: '请求的session不存在'});
};


module.exports.setCartSession = function (req, res) {
    if (req.session && req.body) {
        var cart = req.body;
        req.session[cart.userID] = cart;
        res.json({code: 0});
        return;
    }
    res.json({code: 1, msg: '无法设置session'});
};