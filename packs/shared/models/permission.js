var mongoose = require('mongoose');

var PermissionSchema = new mongoose.Schema({

    permissionType: String,

    name: { type: String, unique: true },

    featureHash: [String],

    description: String,

    isActived: { type: Boolean, default: true }
});

mongoose.model('Permission', PermissionSchema);
