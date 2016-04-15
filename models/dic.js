var mongoose = require('mongoose');

/**
 * 数据字典
 */
var DicSchema = new mongoose.Schema({

    //类型
    type: String,

    //名称
    name: String,

    //数值
    value: String,

    //描述
    desc: String,

    //只读
    readonly: Boolean
});

mongoose.model('Dic', DicSchema);