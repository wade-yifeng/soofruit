/**
 * Created by xz_liu on 2016/3/18.
 */
var router = require('express').Router();
var cart = require('./services/cart');

// cart services
router.post('/cart', cart.create);
router.get('/cart/:userID', cart.detail)
    .put('/cart/:userID', cart.update);

module.exports = router;