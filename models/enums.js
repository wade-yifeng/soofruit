/**
 * 订单状态枚举
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

module.exports.OrdersListType = {

    //未完成订单
    Ongoing: 'Ongoing',

    //已完成订单
    Done: 'Done',

    //全部订单
    All: 'All'
};

/**
 * 地址级别
 */
module.exports.AddressLevel = {

    Province: 'Province',

    City: 'City',

    District: 'District'
};

module.exports.CouponStatus = {

    //未激活
    Pending: 'Pending',

    //可使用
    Usable: 'Usable',

    //已使用/已过期
    Unusable: 'Unusable'
};

/**
 * 角色分类枚举
 */
module.exports.RoleCategory = {

    Admin: 'Administrator',

    Agency: 'Agency',

    User: 'Common User'
};