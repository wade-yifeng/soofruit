/**
 * Created by xz_liu on 2016/3/17.
 */
var OrderStatusEnum = {

    //待付款
    AwaitPay: 0,

    //已付款
    Payed: 1,

    //已收货
    Picked: 2,

    //已成交
    Finish: 3,

    //已撤销
    Cancelled: 4
};

module.exports = OrderStatusEnum;