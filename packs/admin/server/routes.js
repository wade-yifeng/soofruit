/**
 * Created by xz_liu on 2016/3/18.
 */
var router = require('express').Router();
var dic = require('./services/dic');
var strategy = require('./services/strategy');
var good = require('./services/good');
var user = require('./services/user');

// dictionary services
router.get('/dics', dic.list)
    .post('/dics', dic.create);
router.get('/dics/:_id', dic.detail)
    .put('/dics/:_id', dic.update)
    .delete('/dics/:_id', dic.delete);
router.get('/dicTypes', dic.getDicTypes);

// good services
router.get('/goods', good.list)
    .get('/goodsPaged', good.listPaged)
    .post('/goods', good.create);
router.get('/goods/:_id', good.detail)
    .put('/goods/:_id', good.update)
    .delete('/goods/:_id', good.delete);
router.get('/goodCategories', good.getgoodCategories)
    .post('/pics', good.uploadPics)
    .delete('/pics/:_path', good.deletePic);

// strategy services
router.get('/strategies', strategy.list)
    .get('/strategies/:id', strategy.detail)
    .post('/strategies', strategy.save)
    .put('/strategies/:id', strategy.update)
    .delete('/strategies/:id', strategy.delete);
// enums
router.get('/enums', strategy.getEnums);

// user services
router.get('/users', user.list);

module.exports = router;