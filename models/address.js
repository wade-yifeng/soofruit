var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 收货地址
 */
var AddressSchema = new mongoose.Schema({

    //用户ID
    userID: ObjectId,

    //省
    province: String,

    //市
    city: String,

    //区
    region: String,

    //详细地址
    detail: String,

    //默认地址
    isDefault: Boolean
});

mongoose.model('Address', AddressSchema);