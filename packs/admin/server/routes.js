/**
 * Created by xz_liu on 2016/3/18.
 */
var router = require('express').Router();
var dic = require('./services/dic');
var good = require('./services/good');

// dictionary service
router.get('/dics', dic.list)
    .post('/dics', dic.save);
router.get('/dics/:_id', dic.detail)
    .put('/dics/:_id', dic.save)
    .delete('/dics/:_id', dic.delete);
router.get('/dicTypes', dic.getDicTypes);

// good service
router.get('/goods', good.list)
    .post('/goods', good.save);
router.get('/goods/:_id', good.detail)
    .put('/goods/:_id', good.save)
    .delete('/goods/:_id', good.delete);
router.get('/goodCategories', good.getgoodCategories);
router.post('/pics', good.uploadPics);

module.exports = router;