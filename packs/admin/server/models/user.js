/**
 * Created by xz_liu on 2016/3/17.
 */
var mongoose = require('mongoose');
require('../../../shared/server/mongoconn');

/**
 * 用户
 */
var UserSchema = new mongoose.Schema({

    //用户名
    name: String,

    //创建/同步日期
    createDate:　Date
});

module.exports.Order = mongoose.model('User', UserSchema);