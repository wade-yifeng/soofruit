var ValidateResult = require('./validate_result');
var validator = require('validator');

module.exports.ValidateAddress = function (address) {
    var result = new ValidateResult();

    //address.receiver
    if (!address.receiver)
        result.addMsg('receiver', address.receiver, '收货人名字必填');
    else if (!validator.isLength(address.receiver, {min: 2, max: 20}))
        result.addMsg('receiver', address.receiver, '收货人名字长度不合法');

    //address.phone
    if (!address.phone)
        result.addMsg('phone', address.phone, '手机号码必填');
    else if(!validator.isMobilePhone(address.phone,'zh-CN'))
        result.addMsg('phone', address.phone, '手机号码不合法');

    //address.province
    if (!address.province)
        result.addMsg('province', address.province, '没有选择省份');

    //address.city
    if (!address.city)
        result.addMsg('city', address.city, '没有选择市');

    //address.district
    if (!address.district)
        result.addMsg('district', address.district, '没有选择区/县');

    //address.detail
    if (!address.detail)
        result.addMsg('detail', address.detail, '详细地址必填');
    else if (!validator.isLength(address.detail, {min: 5}))
        result.addMsg('detail', address.detail, '详细地址长度不合法');

    return result;
};