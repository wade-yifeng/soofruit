var mongoose = require('mongoose');

var StrategySchema = new mongoose.Schema({
    strategyNmae: { type: String },
    goodId: { type: mongoose.Schema.Types.ObjectId, ref: good },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    strategyType: { type: String },
    discountType: { type: String },
    discountFactor: { type: Number },
    targetBills: { type: Number },
    achievedBills: { type: Number },
    isActive: { type: String },
    created: { type: String, default: Date.now }
});

mongoose.model('Strategy', StrategySchema);