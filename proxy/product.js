var config  = require('config');
var Product = require('../models').Product;

/**
 * 获取新品速递
 * Callback:
 * - err, 数据库异常
 * - products, 商品列表
 * @param {String} query 扩展查询条件
 * 后期考虑根据用户推荐不同的新品
 */
exports.getActiveProducts = function (query, opt, callback) {
    query = query === null ? {active: true} : _.extend(query, {active: true});
    Product.paginate(query, opt || {limit: config.max_page_size, sort: '-lastUpdateTime'},
        function(err, result) {
            if (err) {
                return callback(err);
            }
            if (result.total === 0) {
                return callback(null, []);
            }

            var items = {
                total: result.total,
                docs: _.map(result.docs, function(item) {
                    return {
                        id: item._id,
                        name: item.name,
                        tags: item.tags,
                        img: item.pics[0],
                        originPrice: item.originPrice,
                        sellPrice: item.sellPrice,
                        sales: item.sales,
                        balance: item.balance
                    };
                })
            };

            return callback(null, items);
        }
    );
};