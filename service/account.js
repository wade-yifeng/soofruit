var oauthApi = require('../wechat/api_oauth');
var api = require('../wechat/api');
var async = require('async');
var logger = require('../lib/logger');

module.exports.signin = function (req, res) {
    if (req.query.code === undefined) {
        var absoluteURL = req.protocol + '://' + req.get('host') + req.originalUrl;
        var url = oauthApi.getAuthorizeURL(absoluteURL);
        res.redirect(url);
    }
    else {
        async.waterfall([
                function (callback) {
                    oauthApi.getAccessToken(req.query.code, function (err, result) {
                        if (result.data === undefined || result.data.openid === undefined) {
                            callback(true);
                        }
                        callback(null, result.data.openid);
                    });
                }, function (openID, callback) {
                    api.getUser(openID, function (error, result) {
                        callback(error, result);
                    });
                }], function (err, baseInfo) {
                if (err !== null) {
                    logger.error(err);
                    return;
                }
                res.json({code: 0, data: baseInfo});
            }
        );
    }

};