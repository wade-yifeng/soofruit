/*!     
 * 配置文件（发布环境）：
 * 1. 站点配置（端口，Host地址）       
 * 2. 数据库配置（mongodb，redis）
 * 3. 微信公众号配置       
 * 4. 微信开放平台配置      
 */
module.exports = {
    // 网站的域名
    host: 'www.soofruit.com',

    // 站点端口
    port: 80,

    // 监控网站性能
    oneapm_key: 'XApSBgxfAQEe3e1DTV9HCVUfDR9f57BfCR0LVgQBG7a12lEFH1QOH1FUe93cAlMcCVUYBQM=',

    // 微信开发配置
    WeChat: {
        // 公众号ID
        appID: "wx36418b8bcd9f8c8a",
        // 公众号密钥
        appSecret: "f5e38fb6f3f29d7ae73004b106f8de45",
        // 公众号预设Token    
        token: "Soostep123",
        //推广临时二维码失效时间
        qrCodeExpire: 604800,
        // 服务号菜单
        menu: {
            "button":[
                {
                    "name":"征文大赛",
                    "sub_button":[
                        {
                            "type":"view",
                            "name":"第一期结果公布",
                            "url":"http://mp.weixin.qq.com/s?__biz=MzAwOTg0MzI5MQ==&mid=2649454134&idx=1&sn=830f7a8243fa7261cd008b99de0d674e&scene=0#wechat_redirect"
                        },
                        {
                            "type":"view",
                            "name":"第二期火爆来袭",
                            "url":"http://mp.weixin.qq.com/s?__biz=MzAwOTg0MzI5MQ==&mid=2649454070&idx=1&sn=95d0de93697ea91e59ca95a234338ac0&scene=0#wechat_redirect"
                        },
                        {
                            "type":"view",
                            "name":"往期精选",
                            "url":"http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzAwOTg0MzI5MQ==#wechat_webview_type=1&wechat_redirect"
                        }]
                },
                {
                    "type":"click",
                    "name":"嗖一下",
                    "key":"COMMING_SOON"
                },
                {
                    "name":"平台服务",
                    "sub_button":[
                        {
                            "type":"click",
                            "name":"征文排行榜",
                            "key":"ARTICLE_RANK"
                        },
                        {
                            "type":"click",
                            "name":"悄悄话",
                            "key":"REPLY"
                        },
                        {
                            "type":"click",
                            "name":"属于您的",
                            "key":"COMMING_SOON"
                        },
                        {
                            "type":"click",
                            "name":"关于我们",
                            "key":"COMMING_SOON"
                        }]
                }
            ]
        }
    },

};