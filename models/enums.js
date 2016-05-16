/**
 * 返回的结果代码
 */
module.exports.ResultCode = {

    // 成功
    Success: 200,

    // 非法的参数
    InvalidParams: 100,

    // 数据为空
    NotFound: 400,
    
    // 内部服务器错误
    InternalError: 500
};

/**
 * 订单状态
 */
module.exports.OrderStatus = {

    //已取消
    Cancelled: 'Cancelled',

    //待付款
    AwaitPay: 'AwaitPay',

    //已付款
    Payed: 'Payed',

    //待收货
    AwaitPick: 'AwaitPick',

    //已成交
    Done: 'Done'
};