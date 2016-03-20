/**
 * Created by xz_liu on 2016/3/8.
 */
var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    customer: String,
    amount: Number,
    order_date: {type: Date, default: Date.now},
    delivery_date: Date,
    fruits: [{
        fruit_name: String,
        unit_price: Number,
        fruit_quantity: Number
    }]
});
OrderSchema.index({order_date: -1});

mongoose.model('OldOrder', OrderSchema);