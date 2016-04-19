/*!
 * 微信用户信息API：
 * 1. 提供微信签名Token的认证
 * 2. 提供微信AccessToken的发布(定期刷新)和订阅
 */
var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;
var config = require('config');

/**
 * 获取用户基本信息。可以设置lang，其中zh_CN 简体，zh_TW 繁体，en 英语。默认为en
 * @param {String|Object} options 用户的openid。或者配置选项，包含openid和lang两个属性。
 * @param {Function} callback 回调函数
 */
exports.getUser = function (options, callback) {
    this.preRequest(this._getUser, arguments);
};

/*!
 * 获取用户基本信息的未封装版本
 */
exports._getUser = function (options, callback) {
    if (typeof options !== 'object') {
        options = {
            openid: options
        };
    }
    var url = config.OpenAPI.apiURL + 'user/info?openid=' + options.openid + '&access_token=' + this.token.accessToken;
    this.request(url, {dataType: 'json'}, wrapper(callback));
};

/**
 * 批量获取用户基本信息
 * @param {Array} openids 用户的openid数组。
 * @param {Function} callback 回调函数
 */
exports.batchGetUsers = function (openids, callback) {
    this.preRequest(this._batchGetUsers, arguments);
};

/*!
 * 批量获取用户基本信息的未封装版本
 */
exports._batchGetUsers = function (openids, callback) {
    var url = config.OpenAPI.apiURL + 'user/info/batchget?access_token=' + this.token.accessToken;
    var data = {};
    data.user_list = openids.map(function (openid) {
        return {openid: openid};
    });
    this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 获取关注者列表
 * @param {String} nextOpenid 调用一次之后，传递回来的nextOpenid。第一次获取时可不填
 * @param {Function} callback 回调函数
 */
exports.getFollowers = function (nextOpenid, callback) {
    this.preRequest(this._getFollowers, arguments);
};

/*!
 * 获取关注者列表的未封装版本
 */
exports._getFollowers = function (nextOpenid, callback) {
    // https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
    if (typeof nextOpenid === 'function') {
        callback = nextOpenid;
        nextOpenid = '';
    }
    var url = config.OpenAPI.apiURL + 'user/get?next_openid=' + nextOpenid + '&access_token=' + this.token.accessToken;
    this.request(url, {dataType: 'json'}, wrapper(callback));
};

/**
 * 设置用户备注名
 * @param {String} openid 用户的openid
 * @param {String} remark 新的备注名，长度必须小于30字符
 * @param {Function} callback 回调函数
 */
exports.updateRemark = function (openid, remark, callback) {
    this.preRequest(this._updateRemark, arguments);
};

/*!
 * 设置用户备注名的未封装版本
 */
exports._updateRemark = function (openid, remark, callback) {
    var url = this.prefix + 'user/info/updateremark?access_token=' + this.token.accessToken;
    var data = {
        openid: openid,
        remark: remark
    };
    this.request(url, postJSON(data), wrapper(callback));
};
