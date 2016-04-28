var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
//var config = require('config');

/**
 * 用户
 */
var UserSchema = new mongoose.Schema({

    //unionid: 用户微信ID
    wechatID: {type: String, unique: true},

    //nickname: 用户微信昵称
    nickName: String,

    //sex: 性别 (值为1时是男性，值为2时是女性，值为0时是未知)
    sex: Number,

    //country: 用户所在国家
    country: String,

    //province:	用户所在省份
    province: String,

    //city: 用户所在城市(直辖市时对应城区, 例如: 浦东新区)
    city: String,

    //headimgurl: 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像）.
    //用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
    headImg: String,

    //subscribe_time: 用户关注时间，为时间戳. 如果用户曾多次关注，则取最后关注时间.
    subcribeTime: Date

    //username: String,
    //
    //password: String,
    //
    //appUserId: String,
    //
    //mobile: String,
    //
    //email: String,
    //
    //description: String,
    //
    //role: [String],
    //
    //enabled: { type: Boolean, default: false},
    //
    //weChatId: { type: String, unique: true },
    //
    //isDeleted: { type: Boolean, default: false},
    //
    //lastLoginTime: Date,
    //
    //createTime: { type: Date, default: Date.now},
    //
    //isBlocked: { type: Boolean, default: false},
    //
    //activeTime: Date
});

UserSchema.index({wechatID: 1});
UserSchema.plugin(require('./plugins/paged_find'));

//UserSchema.pre('save', function (next) {
//    var user = this;
//
//    if (!user.isModified('password')) return next();
//
//    bcrypt.genSalt(config.SALT_WORK_FACTOR, function (err, salt) {
//        if (err) return next(err);
//
//        bcrypt.hash(user.password, salt, function (err, hash) {
//            if (err) return next(err);
//            user.password = hash;
//            next();
//        });
//    });
//});
//
//UserSchema.method.comparePasswordSync = function (password, cb) {
//    // use compare SYNC method.
//    var isMatch = bcrypt.compareSync(password, this.password);
//    return cb(isMatch);
//};

mongoose.model('User', UserSchema);