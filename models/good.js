var mongoose = require('mongoose');

/**
 * 商品
 */
var GoodSchema = new mongoose.Schema({

    //名称/标题
    name: String,

    //描述
    desc: String,

    //标签(商品列表中展示用)
    tags: [String],

    //图片相对路径
    pics: [String],

    //保证项(包邮,正品保障,48小时发货,等等)
    ensures: [String],

    //规格(eg:500g)
    spec: String,

    //原产地
    provenance: String,

    //保质期
    shelfLife: Number,

    //存储方式
    storage: String,

    //原价
    originPrice: Number,

    //卖价
    sellPrice: Number,

    //销量
    sales: Number,

    //库存
    balance: Number
});
GoodSchema.plugin(require('./plugins/paged_find'));

mongoose.model('Good', GoodSchema);