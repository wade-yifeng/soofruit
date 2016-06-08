var express = require('express');
var site = require('../controllers/site');
var sign = require('../controllers/sign');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('layout');
});

// home page
router.get('/index', site.index);

module.exports = router;