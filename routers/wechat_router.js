var router = require('express').Router();
var reply = require('../wechat/reply');

// wechat reply and sign service
router.get('/', reply.get)
    .post('/', reply.post);

module.exports = router;