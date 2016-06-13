/**
 * 返回的结果代码
 */
exports.ResultCode = {

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
 * 逻辑层错误消信息（格式）
 */
exports.ErrorMessage = {

    // 数据库错误
    DBErrorFormat: '1000，%s发生数据库错误，异常：%j',

    // Redis错误
    RedisErrorFormat: '2000，%s发生Redis存儲错误，异常：%j',

    // 通用错误
    GeneralErrorFormat: '3000, %s发生错误，异常：%j',

    // 微信API调用错误
    WeChatErrorFormat: '4000，%s发生微信调用错误，异常：%j'
};

/**
 * 订单状态
 */
exports.OrderStatus = {

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