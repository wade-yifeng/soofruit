var models  = require('../models');
var User    = models.User;
var config = require('config');

exports.index = function (req, res, next) {
    var page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;
};