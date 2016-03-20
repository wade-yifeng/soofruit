/**
 * Created by xz_liu on 2016/3/17.
 */
var mongoose = require('mongoose');

/**
 * 数据字典
 */
var DicSchema = new mongoose.Schema({

    //类型
    Type: String,

    //名称
    Name: String,

    //数值
    Value: Number,

    //描述
    Desc: String
});

mongoose.model('Dic', DicSchema);