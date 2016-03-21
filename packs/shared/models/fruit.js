/**
 * Created by xz_liu on 2016/3/17.
 */
var mongoose = require('mongoose');

/**
 * 商品
 */
var GoodSchema = new mongoose.Schema({

    //名称/标题
    name: {Type: String, Default: ''},

    //描述
    desc: {Type: String, Default: ''},

    //分类
    category: {Type: String, Default: ''},

    //图片相对路径
    pics: {Type: [String], Default: []},

    //原产地
    provenance: {Type: String, Default: ''},

    //保质期
    shelfLife: {Type: Number, Default: 0},

    //存储方式
    storage: {Type: String, Default: ''},

    //卖价
    sellPrice: {Type: Number, Default: 0},

    //原价
    originPrice: {Type: Number, Default: 0},

    //销量
    sales: {Type: Number, Default: 0}
});

mongoose.model('Fruit', GoodSchema);