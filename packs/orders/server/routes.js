/**
 * Created by xz_liu on 2016/3/8.
 */
var router = require('express').Router();
var order = require('./services');

// order service
router.get('/orders', order.index)
    .post('/orders', order.create);
router.get('/orders/:_id', order.detail)
    .put('/orders/:_id', order.edit)
    .delete('/orders/:_id', order.delete);

module.exports = router;