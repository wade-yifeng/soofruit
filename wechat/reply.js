var wechat = require('wechat');
var config = require('config');
var logger = require('../common/logger');
var api    = require('../wechat/api');

module.exports.post = wechat(config.WeChat, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    logger.info(message);
    if(message !== undefined) {
        if(message.MsgType === 'text') {
            // message.Content
            api.createLimitQRCode(2001, function(err, result) {
                var qrCodeURL = api.showQRCodeURL(result.ticket);
                logger.info(qrCodeURL);
                res.reply([{
                    title: '快来关注吧',
                    description: '总算搞清楚公众号怎么玩了，大家庆祝下！',
                    picurl: qrCodeURL,
                    url: qrCodeURL
                }]);
            });
        }
    }
});

module.exports.get = function (req, res) {
    logger.info(req.query);
    // 签名成功
    if (wechat.checkSignature(req.query, config.WeChat.token)) {
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
};