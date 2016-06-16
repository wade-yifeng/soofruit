var express = require('express');
var index = require('../controllers/index');
var sign = require('../controllers/sign');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('layout');
});
router.get('/login', sign.login);
// 请求主页数据
router.get('/index', index.home);

module.exports = router;