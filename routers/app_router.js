var express = require('express');
var index = require('../controllers/index');
var sign = require('../controllers/sign');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('layout');
});
router.get('/login', sign.login);
// 请求主页数据
router.get('/getActivities', index.getActivities);
router.get('/getProductList', index.getProductList);

module.exports = router;