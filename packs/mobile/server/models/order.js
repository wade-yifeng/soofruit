/**
 * Created by xz_liu on 2016/3/17.
 */
var mongoose = require('mongoose');
require('../../../shared/server/mongoconn');

/**
 * 订单
 */
var OrderSchema = new mongoose.Schema({

    //订单状态
    status: Number,

    //订单总额
    totalAmount: Number,

    //订单日期
    orderDate: Date,

    //付款日期(用户线下打款后在线上点击"我已付款")
    payDate: Date,

    //收货日期(用户收货后在线上点击"确认收货")
    pickDate: Date,

    //成交日期(确认收货 N 天后自动记入)
    finishDate: Date
});
OrderSchema.index({orderDate: -1});

module.exports.Order = mongoose.model('Order', OrderSchema);