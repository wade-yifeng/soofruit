var router = require('express').Router();
var api = require('./api');

// wechat service
router.get('/wechat', api.get)
    .post('/wechat', api.post);

module.exports = router;