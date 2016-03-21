/**
 * Created by xz_liu on 2016/3/18.
 */
var router = require('express').Router();
var dic = require('./services/dic');
var fruit = require('./services/fruit');

// dictionary service
router.get('/dics', dic.list)
    .post('/dics', dic.save);
router.get('/dics/:_id', dic.detail)
    .put('/dics/:_id', dic.save)
    .delete('/dics/:_id', dic.delete);
router.get('/dicTypes', dic.getDicTypes);

// fruit service
router.get('/fruits', fruit.list)
    .post('/fruits', fruit.save);
router.get('/fruits/:_id', fruit.detail)
    .put('/fruits/:_id', fruit.save)
    .delete('/fruits/:_id', fruit.delete);
router.get('/fruitCategories', fruit.getfruitCategories);

module.exports = router;