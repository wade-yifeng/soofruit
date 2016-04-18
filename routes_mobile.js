var router = require('express').Router();
var account = require('./service/account');

router.get('/account', account.signin);

module.exports = router;