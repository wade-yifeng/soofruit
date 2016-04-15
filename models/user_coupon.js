var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 用户优惠券关系
 */
var UserCouponSchema = new mongoose.Schema({

    //用户ID
    userID: ObjectId,

    //订单ID
    orderID: ObjectId,

    //优惠券ID
    couponID: ObjectId
});

mongoose.model('UserCoupon', UserCouponSchema);