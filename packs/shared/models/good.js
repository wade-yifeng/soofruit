/**
 * Created by xz_liu on 2016/3/17.
 */
var mongoose = require('mongoose');

/**
 * 商品
 */
var GoodSchema = new mongoose.Schema({

    //名称/标题
    name: String,

    //描述
    desc: String,

    //分类
    category: String,

    //图片相对路径
    pics: [String],

    //原产地
    provenance: String,

    //保质期
    shelfLife: Number,

    //存储方式
    storage: String,

    //价格
    price: Number,

    //销量
    sales: Number,

    //库存
    balance: Number
});

mongoose.model('Good', GoodSchema);