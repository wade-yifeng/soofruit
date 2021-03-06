var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 购物车
 */
var CartSchema = new mongoose.Schema({

    //客户ID
    userID: ObjectId,

    //欲购商品
    goods: [{
        goodID: ObjectId,
        name: String,
        sellPrice: Number,
        pic: String,
        quantity: Number
    }],

    //创建时间
    createTime: {type: Date, default: Date.now}
});

mongoose.model('Cart', CartSchema);