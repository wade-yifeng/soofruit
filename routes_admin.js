var router = require('express').Router();
var dic = require('./service/dic');
var good = require('./service/good');
var user = require('./service/user');
var permission = require('./service/permissions');
var role = require('./service/role');
var coupon = require('./service/coupon');

// dictionary services
router.get('/dics', dic.list)
    .post('/dics', dic.create);
router.get('/dics/:_id', dic.detail)
    .put('/dics/:_id', dic.update)
    .delete('/dics/:_id', dic.delete);
router.get('/dicsOfType/:dicType', dic.getDicsOfType);

// good services
router.get('/goodsPaged', good.listPaged)
    .post('/goods', good.create);
router.get('/goods/:_id', good.detail)
    .put('/goods/:_id', good.update)
    .delete('/goods/:_id', good.delete);
router.post('/pics', good.uploadPic)
    .delete('/pics/:_path', good.deletePic);

// coupon services
router.get('/coupons', coupon.list)
    .post('/coupons', coupon.create);
router.get('/coupons/:_id', coupon.detail)
    .put('/coupons/:_id', coupon.update)
    .delete('/coupons/:_id', coupon.delete);

// user services
router.get('/users', user.listPaged)
    .post('/users', user.createUser);
//router.post('/user/signin', user.signin);
//router.get('/user/signout', user.signout);
//router.post('/user/register', user.register);

router.get('/user/:_id', user.userDetail)
    .put('/user/:_id', user.editUser)
    .delete('/user/:_id', user.deleteUser);

router.get('/permissions', permission.permissionList)
    .post('/permissions', permission.createPermission);
router.delete('/permissions/:_id', permission.deletePermission);

router.get('/roleCategories', role.getRoleCategories);

module.exports = router;