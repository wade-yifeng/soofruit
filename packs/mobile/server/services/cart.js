/**
 * Created by xz_liu on 2016/3/18.
 */
var Cart = require('../../../shared/models').Cart;


module.exports.create = function (req, res) {
    var cart = new Cart(req.body);

    cart.save(function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json(cart);
        }
    });
};


module.exports.update = function (req, res) {
    Cart.update({userID: req.params.userID}, req.body, function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json({code: 0});
        }
    });
};


module.exports.detail = function (req, res) {
    Cart.findOne({userID: req.params.userID}).lean()
        .exec(function (err, doc) {
            if (err) {
                res.json({code: 500, message: err});
            }
            else {
                res.json(doc);
            }
        });
};