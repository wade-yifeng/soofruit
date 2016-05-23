var ValidateResult = require('./validate_result');
var validator = require('validator');

exports.ValidateGood = function (good) {
    var result = new ValidateResult();

    //good.name
    if (!good.name)
        result.addMsg('name', good.name, '商品名称必填');
    else if (!validator.isLength(good.name, {min: 10, max: 100}))
        result.addMsg('name', good.name, '商品名长度必须为10-100');

    //good.desc
    if (!good.desc)
        result.addMsg('name', good.name, '商品描述必填');

    //good.xxx

    return result;
};