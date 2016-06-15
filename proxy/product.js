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
    query = _.extend(query, {active: true});
    Product.find(query, {}, opt || {limit: config.max_page_size, sort: '-lastUpdateTime'},
        function(err, products) {
            if (err) {
                return callback(err);
            }
            if (products.length === 0) {
                return callback(null, []);
            }

            var items = _.map(products, function(item) {
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
            });

            return callback(null, items);
        }
    );
};