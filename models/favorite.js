var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 用户商品收藏
 */
var FavoriteSchema = new mongoose.Schema({

    //用户ID
    userID: ObjectId,

    //商品ID
    goodID: ObjectId
});

mongoose.model('Favorite', FavoriteSchema);