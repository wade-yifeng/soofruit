var router = require('express').Router();
var reply = require('./reply');

// wechat reply and sign service
router.get('/wechat', reply.get)
    .post('/wechat', reply.post);

module.exports = router;