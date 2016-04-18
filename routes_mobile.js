var router = require('express').Router();
var account = require('./service/account');
var cart = require('./service/cart');

router.get('/account', account.signin);

router.get('/cartSession/:_id', cart.getCartSession)
    .post('/cartSession/:_id', cart.setCartSession);

module.exports = router;