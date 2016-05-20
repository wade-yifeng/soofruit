var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var BaseModel = require("./base_model");


var ArticleSchema = new Schema({

    //文章名称（北海之南征文大赛）
    name: String,

    //文章标题
    title: String,

    //作者
    author: String,

    //文章概述
    desc: String,

    //文章类型（资讯类，推广类，热点类，情怀类）
    type: String,

    //分类标签
    tags: [String],

    //文章图片路径（第一张为主图）
    pics: [String],

    //文章单独链接地址（订阅号素材链接等）
    url: String,

    //推广二维码对应的场景ID
    qrCodeID: Number,

    //文章推广二维码获取地址
    qrCodeURL: String,

    //文章推广关注数量
    records: { type: Number, default: 0 },

    //是否在发现页顶部显示
    top: { type: Boolean, default: false },

    //文章优先级
    priority: { type: Number, default: 1 },

    //是否在发现页显示
    spotlight: { type: Boolean, default: false },

    //是否激活
    active: { type: Boolean, default: false },

    //创建时间
    createTime: { type: Date, default: Date.now},

    //最近更新时间
    lastUpdateTime: { type: Date, default: Date.now}
});

ArticleSchema.plugin(BaseModel);
ArticleSchema.index({qrCodeID: 1});
ArticleSchema.index({spotlight: -1, active: -1, priority: 1});
ArticleSchema.index({top: -1, active: -1, priority: 1});

mongoose.model('Article', ArticleSchema);
