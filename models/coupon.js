var mongoose = require('mongoose');

/**
 * 优惠券
 */
var CouponSchema = new mongoose.Schema({

    //面值
    amount: Number,

    //要求最低消费
    minExpense: Number
});

mongoose.model('Coupon', CouponSchema);