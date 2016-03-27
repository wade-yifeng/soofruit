/**
 * Created by xz_liu on 2016/3/17.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

    name: { type: String, unique: true },

    appUserId: String,

    mobile: { type: String, unique: true },

    email: { type: String, unique: true },

    password: String,

    description: String,

    role: [String],

    enabled: { type: Boolean, default: false},

    weChatId: { type: String, unique: true },

    //微信
    uuid: { type: String, unique: true },

    isDeleted: { type: Boolean, default: false},

    lastLoginTime: Date,

    createTime: { type: Date, default: Date.now},

    activeTime: Date
});

UserSchema.index({ name: 1 });

UserSchema.index({ uuid: 1 });

UserSchema.index({ weChatId: 1 });

mongoose.model('User', UserSchema);