var mongoose = require('mongoose');
var config   = require('config');
var logger   = require('../common/logger');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        logger.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./user');
require('./subject');
require('./product');
require('./favorite');
require('./article');
require('./reply');

exports.User     = mongoose.model('User');
exports.Subject  = mongoose.model('Subject');
exports.Enums    = require('./enums');
exports.Product  = mongoose.model('Product');
exports.Favorite = mongoose.model('Favorite');
exports.Article  = mongoose.model('Article');
exports.Reply  = mongoose.model('Reply');