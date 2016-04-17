var router = require('express').Router();
var session = require('./service/session');

// redis session测试
router.get('/session/:key', session.getSession);
router.post('/session', session.setSession);

module.exports = router;