var mongoose = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var BaseModel = require("./base_model");

// 目前作为520活动，保存用户对其他用户的留言
var ReplySchema = new Schema({
    //留言所属用户
    userID: ObjectId,

    //留言所属用户的微信参数nickname
    nickName: String,

    //微信参数nickname: 需要回复的微信昵称
    targetName: String,

    //回复类型（心里话）
    type: String,

    //回复的消息
    msg: String,

    //是否已经处理
    available: { type: Boolean, default: true },

    //回复结果(true/err)
    result: String,

    //需要回复的用户：找到对应的用户并在回复后记录
    targetID: ObjectId,

    //创建时间
    createTime: { type: Date, default: Date.now},

    //最近更新时间
    lastUpdateTime: { type: Date, default: Date.now}
});

ReplySchema.plugin(BaseModel);
ReplySchema.index({nickName: 1, available: 1});

mongoose.model('Reply', ReplySchema);
