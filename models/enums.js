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

/**
 * 结算类型
 */
module.exports.SettleType = {

    //优惠券扣减
    CouponDeduction: 'CouponDeduction',

    //积分扣减
    PointsDeduction: 'PointsDeduction'
};

/**
 * 订单列表类型
 */
module.exports.OrdersListType = {

    //未完成订单
    Ongoing: 'Ongoing',

    //已完成订单
    Done: 'Done',

    //全部订单
    All: 'All'
};

/**
 * 优惠券类型
 */
module.exports.CouponType = {

    //新用户送优惠券
    NewUser: 'NewUser',

    //积分兑换优惠券
    PointsExchange: 'PointsExchange'

    //敬请期待其它优惠券类型
};

/**
 * 优惠券状态
 */
module.exports.CouponStatus = {

    //未激活
    Pending: 'Pending',

    //可使用
    Usable: 'Usable',

    //已使用/已过期
    Unusable: 'Unusable'
};

/**
 * 地址级别
 */
module.exports.AddressLevel = {

    Province: 'Province',

    City: 'City',

    District: 'District'
};

/**
 * 角色分类
 */
module.exports.RoleCategory = {

    Admin: 'Administrator',

    Agency: 'Agency',

    User: 'Common User'
};