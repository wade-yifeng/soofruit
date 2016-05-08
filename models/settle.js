var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 订单结算
 */
var SettleSchema = new mongoose.Schema({

    //订单ID
    orderID: ObjectId,

    //结算类型
    type: String,

    //抵扣金额
    deductAmount: Number,

    //创建时间
    createTime: {type: Date, default: Date.now}
});

mongoose.model('Settle', SettleSchema);