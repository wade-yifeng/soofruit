var mongoose = require('mongoose');
var BaseModel = require("./base_model");

var UserSchema = new mongoose.Schema({

    //微信参数unionid: 用户对应公众号的唯一ID
    unionID: {type: String, unique: true},

    //微信参数nickname: 用户微信昵称
    nickName: String,

    //微信参数sex: 性别(值为1时是男性，值为2时是女性，值为0时是未知)
    sex: Number,

    //微信参数country: 用户所在国家
    country: String,

    //微信参数province: 用户所在省份
    province: String,

    //微信参数city: 用户所在城市(直辖市时对应城区，例如: 浦东新区)
    city: String,

    //微信参数headimgurl: 用户头像，最后一个数值代表正方形头像大小(有0、46、64、96、132数值可选，0代表640*640正方形头像).
    //用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
    headImg: String,

    //微信参数remark: 微信公众号运营者对粉丝的备注
    remark: String,

    //微信参数subscribe_time: 用户关注时间，为时间戳. 如果用户曾多次关注，则取最后关注时间.
    subcribeTime: Date,

    //最后一次登录时间
    lastLoginTime: Date,

    //创建时间
    createTime: { type: Date, default: Date.now},

    //最近更新时间
    lastUpdateTime: { type: Date, default: Date.now},

    //用户名
    username: String,

    //用户标签(通过专门微信接口获取，暂时用来管理权限，比如:SuperAdmin)
    tag: String,

    //默认手机号码
    mobile: String,

    //用户积分
    points: {type: Number, default: 0},

    //帐号是否锁定
    isBlocked: {type: Boolean, default: false},
});

UserSchema.plugin(BaseModel);
UserSchema.index({createTime: -1});

mongoose.model('User', UserSchema);