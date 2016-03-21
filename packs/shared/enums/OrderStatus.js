/**
 * Created by xz_liu on 2016/3/17.
 */
var OrderStatusEnum = {

    //待付款
    AwaitPay: 'AwaitPay',

    //已付款
    Payed: 'Payed',

    //已收货
    Picked: 'Picked',

    //已成交
    Finish: 'Finish',

    //已撤销
    Cancelled: 'Cancelled'
};

module.exports = OrderStatusEnum;