var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 用户优惠券关系
 */
var UserCouponSchema = new mongoose.Schema({

    //用户ID
    userID: ObjectId,

    //优惠券类型
    type: String,

    //面值
    amount: Number,

    //要求最低用户积分
    minPoints: Number,

    //优惠券状态
    status: String,

    //创建时间
    createTime: {type: Date, default: Date.now}
});
UserCouponSchema.plugin(require('./plugins/paged_find'));

mongoose.model('UserCoupon', UserCouponSchema);