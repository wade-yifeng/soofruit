var models = require('../models');
var User = models.User;
var logger = require('../common/logger');

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} unionID 用户在公众号中的唯一ID
 * @param {Function} callback 回调函数
 */
exports.getUserByUnionID = function (unionID, callback) {
    User.findOne({unionID: unionID}, callback);
};

/**
 * 根据用户在公众号中的唯一ID，更新（创建）用户
 * @param {String} baseInfo 微信基础信息
 */
exports.updateUserByUnionID = function(baseInfo, callback) {
    var entity = {
        unionID: baseInfo.unionid,
        nickName: baseInfo.nickname,
        sex: baseInfo.sex,
        country: baseInfo.country,
        province: baseInfo.province,
        city: baseInfo.city,
        headImg: baseInfo.headimgurl,
        remark: baseInfo.remark,
        subcribeTime: new Date(baseInfo.subscribe_time * 1000),
        lastLoginTime: Date.now()
    };
    User.findOneAndUpdate({unionID: entity.unionID}, entity, {upsert: true, setDefaultsOnInsert: true}, callback);
};
                            