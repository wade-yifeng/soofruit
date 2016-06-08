var express = require('express');
var site = require('../controllers/site');
var sign = require('../controllers/sign');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('layout');
});
router.get('/login', sign.login);
// 请求主页数据
router.get('/index', site.index);

module.exports = router;