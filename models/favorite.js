var mongoose = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var BaseModel = require("./base_model");

/**
 * 用户产品收藏
 */
var FavoriteSchema = new Schema({

    //用户ID
    userID: ObjectId,

    //产品ID
    productID: ObjectId,

    //创建时间
    createTime: { type: Date, default: Date.now}
});

FavoriteSchema.plugin(BaseModel);

mongoose.model('Favorite', FavoriteSchema);