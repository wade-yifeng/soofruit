/**
 * Created by Leo on 2016/3/12.
 */
var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        console.log(err);
    }
});

require('./models/dic');
require('./models/fruit');
require('./models/old_order');
require('./models/order');
require('./models/order_user_good');
require('./models/user');
require('./models/strategy');

module.exports.Dic = mongoose.model('Dic');
module.exports.Fruit = mongoose.model('Fruit');
module.exports.OldOrder = mongoose.model('OldOrder');
module.exports.Order = mongoose.model('Order');
module.exports.OrderUserGood = mongoose.model('OrderUserGood');
module.exports.User = mongoose.model('User');
module.exports.Strategy = mongoose.model('Strategy');