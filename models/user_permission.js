var mongoose = require('mongoose');

/**
 * 用户权限关系
 */
var UserPermissionSchema = new mongoose.Schema({

    userId: mongoose.Schema.Types.ObjectId,

    permissionId: mongoose.Schema.Types.ObjectId,

    //Pid: String,

    isDeleted: { type: Boolean, default: false},

    assignedTime: { type: Date, default: Date.now },

    //AdminUserId: mongoose.Schema.Types.ObjectId,

    enabled: { type: Boolean, default: true}
});

UserPermissionSchema.index({ UserId: 1, PermissionId: 1 });

mongoose.model('UserPermission', UserPermissionSchema);