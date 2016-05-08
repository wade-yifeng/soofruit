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
    minPoints: Number,

    //创建时间
    createTime: {type: Date, default: Date.now}
});

mongoose.model('Coupon', CouponSchema);