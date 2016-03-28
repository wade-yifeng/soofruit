/**
 * Created by xz_liu on 2016/3/17.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var config = require('config');

var UserSchema = new mongoose.Schema({

    username: String,
    
    password: String,

    appUserId: String,

    mobile: String,

    email: String,    

    description: String,

    role: [String],

    enabled: { type: Boolean, default: false},

    weChatId: { type: String, unique: true },

    //微信
    unifyuserid: { type: String, unique: true },

    isDeleted: { type: Boolean, default: false},

    lastLoginTime: Date,

    createTime: { type: Date, default: Date.now},

    activeTime: Date
});

UserSchema.index({ unifyuserid: 1 });

UserSchema.index({ weChatId: 1 });

UserSchema.pre('save', function (next) {
    var user = this;
    
    if (!user.isModified('password')) return next();
       
    bcrypt.genSalt(config.SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.method.comparePasswordSync = function (password, cb) {
    // use compare SYNC method.
    var isMatch = bcrypt.compareSync(password, this.password);
    return cb(isMatch);
};

mongoose.model('User', UserSchema);