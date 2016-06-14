/*!     
 * 配置文件（开发环境）：    
 */
var config = {
    // 应用名称
    name: 'Soofruit1',

    //默认调试状态开启
    debug: false,

    // 网站的域名
    host: 'localhost',

    // 站点端口
    port: 80,

    // 监控网站性能
    oneapm_key: 'XApSBgxfAQEe3e1DTV9HCVUfDR9f57BfCR0LVgQBG7a12lEFH1QOH1FUe93cAlMcCVUYBQM=',

    // 单页最小记录数
    min_page_size: 10,

    // 首页最小活动数量
    min_subject_size: 5,

    // 首页最小热点显示数量
    min_spotlight_size: 10,

    // 数据库连接字符串
    db: "mongodb://127.0.0.1/soofruit",

    // session的密钥字符
    session_secret: 'soofruit_secret_dev',

    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,

    // 保存身份Cookie的Key
    auth_cookie_name: 'soofruit_auth',

    // 文件上传限制
    file_limit: '1MB',

    // 图片上传路径
    upload_directory: "./public/images/upload",

    // 默认数据缓存时间，秒为单位
    default_cache_time: 600,

    // 微信(soostep作为测试)
    WeChat: {
        // 公众号ID
        appID: "wx94911ed9aa3ef58c",
        // 公众号密钥
        appSecret: "c2f8def6c499b979bc46f7beee43091d",
        // 公众号预设Token    
        token: "Soostep123",
        //推广临时二维码失效时间
        qrCodeExpire: 604800,

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
                    "type":"view",
                    "name":"嗖一下",
                    "url":"http://test.soofruit.com"
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

    OpenAPI: {
        authorizeURL: "https://open.weixin.qq.com/connect/oauth2/authorize",
        authorizeURLForWebsite: "https://open.weixin.qq.com/connect/qrconnect",
        oauth2URL: "https://api.weixin.qq.com/sns/oauth2/access_token",
        oauth2RefreshURL: "https://api.weixin.qq.com/sns/oauth2/refresh_token",
        verifyTokenURL: "https://api.weixin.qq.com/sns/auth",
        getUserURL: "https://api.weixin.qq.com/sns/userinfo",
        apiURL: 'https://api.weixin.qq.com/cgi-bin/',
        mpURL: 'https://mp.weixin.qq.com/cgi-bin/',
        fileServerURL: 'http://file.api.weixin.qq.com/cgi-bin/',
        payURL: 'https://api.weixin.qq.com/pay/',
        merchantURL: 'https://api.weixin.qq.com/merchant/',
        customserviceURL: 'https://api.weixin.qq.com/customservice/'
    }
};

if(process.env.NODE_ENV === 'production') {
    config.debug = false;
}

module.exports = config;