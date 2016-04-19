/*!
 * 微信验证基础类：
 * 1. 提供微信签名Token的认证
 * 2. 提供微信AccessToken的发布(定期刷新)和订阅
 * 3. 提供OAuth第三方网站认证和公众号认证
 * 4. 提供获取用户WeChat数据的方法
 */
var urllib = require('urllib');
var config = require('config');
var wrapper = require('./util').wrapper;
var querystring = require('querystring');

// 以data保存当前AccessToken
var AccessToken = function (data) {
    if (!(this instanceof AccessToken)) {
        return new AccessToken(data);
    }
    this.data = data;
};

// 判断是否过期，加入缓冲时间
AccessToken.prototype.isValid = function () {
    // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
    return !!this.data.access_token && (new Date().getTime()) < (this.data.create_at + (this.data.expires_in  - 10) * 1000);
};

// 处理AccessToken的私有方法
var processToken = function (that, callback) {
  return function (err, data, res) {
    if (err) {
        return callback(err, data);
    }

    data.create_at = new Date().getTime();
    // 存储token
    that.saveToken(data.openid, data, function (err) {
        callback(err, new AccessToken(data));
    });
  };
};

var OAuth = function (appID, appSecret) {
    this.appID = appID || config.WeChat.appID;
    this.appSecret = appSecret || config.WeChat.appSecret;
    this.store = {};

    this.getToken = function(openid, callback) {
        callback(null, this.store[openid]);
    };

    this.saveToken = function (openid, token, callback) {
        this.store[openid] = token;
        callback(null);
    };

    this.defaults = {};
};

// 设置OAuth类库的相关配置
// e.g. oauth.setOpts({timeout: 15000});
OAuth.prototype.setOpts = function (opts) {
    this.defaults = opts;
};

// 处理微信请求公共类
OAuth.prototype.request = function (url, opts, callback) {
    var options = {};
    extend(options, this.defaults);

    if (typeof opts === 'function') {
        callback = opts;
        opts = {};
    }

    for (var key in opts) {
        if (key !== 'headers') {
            options[key] = opts[key];
        }
        else if(opts.headers) {
            options.headers = options.headers || {};
            extend(options.headers, opts.headers);
        }
    }

    urllib.request(url, options, callback);
};

/**
 * 公众号获取授权页面的URL地址
 * @param {String} redirect 授权后要跳转的地址
 * @param {String} state 开发者可提供的数据
 * @param {String} scope 作用范围，值为snsapi_userinfo和snsapi_base，前者用于弹出，后者用于跳转
 */
OAuth.prototype.getAuthorizeURL = function (redirect, state, scope) {
    var url = config.OpenAPI.authorizeURL;

    var info = {
        appid: this.appid,
        redirect_uri: redirect,
        response_type: 'code',
        scope: scope || 'snsapi_base',
        state: state || ''
    };

    return url + '?' + querystring.stringify(info) + '#OAuth_redirect';
};

/**
 * 网站应用获取授权页面的URL地址
 * @param {String} redirect 授权后要跳转的地址
 * @param {String} state 开发者可提供的数据
 * @param {String} scope 作用范围，值为snsapi_login，前者用于弹出，后者用于跳转
 */
OAuth.prototype.getAuthorizeURLForWebsite = function (redirect, state, scope) {
    var url = onfig.OpenAPI.authorizeURLForWebsite;

    var info = {
        appid: this.appid,
        redirect_uri: redirect,
        response_type: 'code',
        scope: scope || 'snsapi_login',
        state: state || ''
    };

    return url + '?' + querystring.stringify(info) + '#OAuth_redirect';
};

/**
 * 根据授权获取到的code，换取access token和openid
 * 获取openid之后，可以调用`OAuth.API`来获取更多信息
 * {
 *  data: {
 *    "access_token": "ACCESS_TOKEN",
 *    "expires_in": 7200,
 *    "refresh_token": "REFRESH_TOKEN",
 *    "openid": "OPENID",
 *    "scope": "SCOPE"
 *  }
 * }
 * @param {String} code 授权获取到的code
 * @param {Function} callback 回调函数
 */
OAuth.prototype.getAccessToken = function (code, callback) {
    var url = config.OpenAPI.oauth2URL;

    var info = {
        appid: this.appid,
        secret: this.appsecret,
        code: code,
        grant_type: 'authorization_code'
    };

    var args = {
        data: info,
        dataType: 'json'
    };

    this.request(url, args, wrapper(processToken(this, callback)));
};

/**
 * 根据refresh token，刷新access token，调用getAccessToken后才有效
 * {
 *  data: {
 *    "access_token": "ACCESS_TOKEN",
 *    "expires_in": 7200,
 *    "refresh_token": "REFRESH_TOKEN",
 *    "openid": "OPENID",
 *    "scope": "SCOPE"
 *  }
 * }
 * @param {String} refreshToken refreshToken
 * @param {Function} callback 回调函数
 */
OAuth.prototype.refreshAccessToken = function (refreshToken, callback) {
    var url = config.OpenAPI.oauth2RefreshURL;

    var info = {
        appid: this.appid,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    };

    var args = {
        data: info,
        dataType: 'json'
    };

    this.request(url, args, wrapper(processToken(this, callback)));
};

// 获取用户信息
OAuth.prototype._getUser = function (options, accessToken, callback) {
    var url = 'https://api.weixin.qq.com/sns/userinfo';

    var info = {
        access_token: accessToken,
        openid: options.openid,
        lang: options.lang || 'en'
    };

    var args = {
        data: info,
        dataType: 'json'
    };

    this.request(url, args, wrapper(callback));
};

/**
 * 根据openid，获取用户信息。
 * 当access token无效时，自动通过refresh token获取新的access token。然后再获取用户信息
 * {
 *  "openid": "OPENID",
 *  "nickname": "NICKNAME",
 *  "sex": "1",
 *  "province": "PROVINCE"
 *  "city": "CITY",
 *  "country": "COUNTRY",
 *  "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
 *  "privilege": [
 *    "PRIVILEGE1"
 *    "PRIVILEGE2"
 *  ]
 * }
 * @param {Object|String} options 传入openid或者参见Options
 * @param {Function} callback 回调函数
 */
OAuth.prototype.getUser = function (options, callback) {
    if (typeof options !== 'object') {
        options = {
            openid: options
        };
    }

    var that = this;

    this.getToken(options.openid, function (err, data) {
        if (err) {
            return callback(err);
        }

        // 没有token数据
        if (!data) {
            var error = new Error('No token for ' + options.openid + ', please authorize first.');
            error.name = 'NoOAuthTokenError';
            return callback(error);
        }

        var token = new AccessToken(data);
        
        if (token.isValid()) {
            that._getUser(options, token.data.access_token, callback);
        } else {
            that.refreshAccessToken(token.data.refresh_token, function (err, token) {
                if (err) {
                    return callback(err);
                }

                that._getUser(options, token.data.access_token, callback);
            });
        }
    });
};

OAuth.prototype._verifyToken  = function (openid, accessToken, callback) {
    var url = config.OpenAPI.authURL;

    var info = {
        access_token: accessToken,
        openid: openid
    };

    var args = {
        data: info,
        dataType: 'json'
    };

    this.request(url, args, wrapper(callback));
};

/**
 * 根据code，获取用户信息。
 * {
 *  "openid": "OPENID",
 *  "nickname": "NICKNAME",
 *  "sex": "1",
 *  "province": "PROVINCE"
 *  "city": "CITY",
 *  "country": "COUNTRY",
 *  "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
 *  "privilege": [
 *    "PRIVILEGE1"
 *    "PRIVILEGE2"
 *  ]
 * }
 * @param {String} code 授权获取到的code
 * @param {Function} callback 回调函数
 */
OAuth.prototype.getUserByCode = function (code, callback) {
    var that = this;
    this.getAccessToken(code, function (err, result) {
        if (err) {
          return callback(err);
        }

        that.getUser(result.data.openid, callback);
    });
};

module.exports = OAuth;

/*
// 微信API
var api = new API(config.appID, config.appSecret, function(callback) {
    
})
*/