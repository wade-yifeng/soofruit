var router = require('express').Router();
var account = require('./service/account');
var cart = require('./service/cart');
var addressOrigin = require('./service/address_origin');
var address = require('./service/address');
var order = require('./service/order');
var favorite = require('./service/favorite');

//wechat reply.post测试所用route
router.get('/account', account.signin);

router.get('/account/:targetUrl', account.signin);
router.get('/userSession', account.getUserSession);

router.get('/cartSession', cart.getCartSession)
    .post('/cartSession', cart.setCartSession);

router.get('/addressOrigin/:addrLv/:id', addressOrigin.list);
router.get('/addresses/:userID', address.list);
router.post('/address', address.create);
router.get('/address/:_id', address.detail)
    .put('/address/:_id', address.update)
    .delete('/address/:_id', address.delete);
router.get('/addressDefault/:userID', address.default);

router.get('/ordersPaged', order.listPaged)
    .post('/orders', order.create);
router.get('/orders/:_id', order.detail)
    .put('/orders/:_id', order.update)
    .delete('/orders/:_id', order.delete);

router.get('/favoriteSimple/:userID', favorite.listSimple);
router.get('/favoriteIntact/:userID', favorite.listIntact);
router.post('/favorite', favorite.create);
router.delete('/favorite/:_id', favorite.delete);

module.exports = router;