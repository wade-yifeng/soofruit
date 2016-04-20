var router = require('express').Router();
var account = require('./service/account');
var cart = require('./service/cart');
var addressOrigin = require('./service/address_origin');

router.get('/account', account.signin);

router.get('/cartSession/:_id', cart.getCartSession)
    .post('/cartSession', cart.setCartSession);

router.get('/addressOrigin/:addrLv/:id', addressOrigin.list);

module.exports = router;