var router = require('express').Router();
var cart = require('./service/cart');

// cart services
router.post('/cart', cart.create);
router.get('/cart/:userID', cart.detail)
    .put('/cart/:userID', cart.update);

module.exports = router;