var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var BaseModel = require("./base_model");

// var subject3 = {
//     name: '测试2',
//     desc: '这是一个测试主题',
//     type: 'test',
//     tags: ['item', 'top5'],
//     url: 'http://test.soofruit.com',
//     pics: ['http://soofruit.oss-cn-hangzhou.aliyuncs.com/item/watermelon.jpg'],
//     top: true,
//     priority: 2,
//     spotlight: true,
//     active: true,
//     createTime: '2016-06-13'
// };

var SubjectSchema = new Schema({

    //主题名称
    name: String,

    //描述
    desc: String,

    //主题类型（资讯类，推广类，秒杀，促销）
    type: String,

    //分类标签
    tags: [String],

    //活动图片路径
    pics: [String],

    //活动单独链接地址
    url: String,

    //对应的产品ID
    itemID: ObjectId,

    //对应的文字ID
    articleID: ObjectId,

    //是否在首页轮播显示
    top: { type: Boolean, default: false },

    //主题优先级
    priority: { type: Number, default: 1 },

    //是否在首页热点显示
    spotlight: { type: Boolean, default: false },

    //是否激活
    active: { type: Boolean, default: false },

    //创建时间
    createTime: { type: Date, default: Date.now},

    //最近更新时间
    lastUpdateTime: { type: Date, default: Date.now}
});

SubjectSchema.plugin(BaseModel);
SubjectSchema.index({spotlight: -1, active: -1, priority: 1});
SubjectSchema.index({top: -1, active: -1, priority: 1});

mongoose.model('Subject', SubjectSchema);