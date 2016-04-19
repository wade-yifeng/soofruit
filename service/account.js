var oauthApi = require('../wechat/api_oauth');
var api = require('../wechat/api');
var async = require('async');
var logger = require('../lib/logger');
var request = require('request');

module.exports.signin = function (req, res) {
    if(req.query.code === undefined) {
        logger.info("get auth code");
        var absoluteURL = req.protocol + '://' + req.get('host') + req.originalUrl;
        var url = oauthApi.getAuthorizeURL(absoluteURL);
        res.redirect(url);
    }
    else {
        logger.info("get back code", req.query.code);
        async.waterfall([
            function(callback){
                logger.info("get auth openID");
                oauthApi.getAccessToken(req.query.code, function (err, result) {
                    logger.info("get back openID", result);
                    if(result.data === undefined || result.data.openid === undefined) {
                        callback(true);
                    }
                    callback(null, result.data.access_token, result.data.openid);
                });
            }, function(openID, callback){
                logger.info("get auth baseinfo");
                api.getUser(openID, function(result){
                    logger.info("get back baseinfo", result);
                    callback(null, result);
                });
            }], function (err, baseInfo) {
                logger.info("Congratulation!", baseInfo);
                if(err !== null){
                    logger.error(err);
                }

            }
        );
    }
    
};