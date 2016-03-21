/**
 * Created by xz_liu on 2016/3/17.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 订单_用户_商品 关联表
 */
var OrderUserGoodSchema = new mongoose.Schema({

     //订单ID
     orderID: ObjectId,

     //用户ID
     userID: ObjectId,

     //商品
     goods: [{
         goodID: ObjectId,
         quantity: Number
     }]
});

mongoose.model('OrderUserGood', OrderUserGoodSchema);