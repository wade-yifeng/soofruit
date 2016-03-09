/**
 * Created by xz_liu on 2016/3/8.
 */
var router = require('express').Router();

var order = require('./services/order');

// order service
router.get('/orders', order.index);
router.get('/orders/:_id', order.detail);
router.post('/orders', order.create);
router.post('/orders/edit', order.edit);
router.post('/orders/delete', order.delete);

module.exports = router;