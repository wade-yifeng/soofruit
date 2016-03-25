var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var StrategySchema = new mongoose.Schema({
    strategyName: { type: String },
    goodId: { type: ObjectId },
    userId: { type: ObjectId }, // distributor user id.
    strategyType: { type: String }, // StrategyType enum.
    discountType: { type: String }, // DiscountType enum.
    discountFactor: { type: Number },
    targetBills: { type: Number },
    achievedBills: { type: Number },
    isActive: { type: String },
    created: { type: String, default: Date.now }
});

mongoose.model('Strategy', StrategySchema);