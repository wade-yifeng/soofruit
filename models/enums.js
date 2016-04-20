/**
 * 订单状态枚举
 */
module.exports.OrderStatus = {

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

/**
 * 角色分类枚举
 */
module.exports.RoleCategory = {

    Admin: 'Administrator',

    Agency: 'Agency',

    User: 'Common User'
};

/**
 * 地址级别
 */
module.exports.AddressLevel = {

    Province: 'Province',

    City: 'City',

    District: 'District'
};