var oauthApi = require('../wechat/api_oauth');
var async = require('async');
var logger = require('../lib/logger');

module.exports.signin = function (req, res) {
    async.waterfall([
        function(callback){
            var url = oauthApi.getAuthorizeURL(req.url);
            callback(null, url);
        }, function(url, callback){
            var code = "";
            request.get(url).end(function (err, res) {
                code = res;
            });
            callback(null, code);
        }, function(code, callback){
            var accessToken, openid;
            oauthApi.getAccessToken(req.code, function (err, result) {
                accessToken = result.data.access_token;
                openid = result.data.openid;
            });
            callback(null, accessToken, openid);
    }], function (err, accessToken, openid) {
        if(err !== null){
            logger.error(err);
        }
    });
};