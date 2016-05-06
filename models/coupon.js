var mongoose = require('mongoose');

/**
 * 优惠券
 */
var CouponSchema = new mongoose.Schema({

    //类型
    type: String,

    //面值
    amount: Number,

    //要求最低用户积分
    minPoints: Number
});

mongoose.model('Coupon', CouponSchema);