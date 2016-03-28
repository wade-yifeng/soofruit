/**
 * Created by leo on 3/27/16.
 */
var ValidateResult = require('./validate_result');
var validator = require('validator');

module.exports.ValidateGood = function (good) {
    var result = new ValidateResult();

    //good.name
    if (!good.name)
        result.addMsg('name', good.name, '商品名称必填');
    else if (!validator.isLength(good.name, {min: 2, max: 50}))
        result.addMsg('name', good.name, '商品名长度必须为2-50');

    //good.desc
    if (!good.desc)
        result.addMsg('name', good.name, '商品描述必填');

    //good.xxx

    return result;
};