var oauthApi = require('../wechat/api_oauth');

module.exports.signin = function (req, res) {
    if(req.code === undefined){
        var url = oauthApi.getAuthorizeURL(req.url);

        client.getAccessToken(req.code, function (err, result) {
            var accessToken = result.data.access_token;
            var openid = result.data.openid;
        });
    }
};