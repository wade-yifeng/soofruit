/**
 * Created by xz_liu on 2016/3/8.
 */
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        console.log(err);
    }
});

require('./order');

exports.Order = mongoose.model('Order');