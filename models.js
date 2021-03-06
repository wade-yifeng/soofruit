var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        console.log(err);
    }
});

require('./models/address');
require('./models/address_origin');
require('./models/cart');
require('./models/coupon');
require('./models/dic');
require('./models/favorite');
require('./models/good');
require('./models/order');
require('./models/permission');
require('./models/settle');
require('./models/user');
require('./models/user_coupon');
require('./models/user_permission');

module.exports.Address = mongoose.model('Address');
module.exports.Province = mongoose.model('Province');
module.exports.City = mongoose.model('City');
module.exports.District = mongoose.model('District');
module.exports.Cart = mongoose.model('Cart');
module.exports.Coupon = mongoose.model('Coupon');
module.exports.Dic = mongoose.model('Dic');
module.exports.Favorite = mongoose.model('Favorite');
module.exports.Good = mongoose.model('Good');
module.exports.Order = mongoose.model('Order');
module.exports.Permission = mongoose.model('Permission');
module.exports.Settle = mongoose.model('Settle');
module.exports.User = mongoose.model('User');
module.exports.UserCoupon = mongoose.model('UserCoupon');
module.exports.UserPermission = mongoose.model('UserPermission');

module.exports.ValidateAddress = require('./models/validators/address').ValidateAddress;
module.exports.ValidateGood = require('./models/validators/good').ValidateGood;