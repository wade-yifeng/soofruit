/*!     
 * 配置文件（开发环境）：
 * 1. 站点配置（端口，Host地址）       
 * 2. 数据库配置（mongodb，redis）
 * 3. 微信公众号配置       
 * 4. 微信开放平台配置      
 */
var config = {
    // 应用名称
    name: 'Soofruit',

    // 是否调试状态
    debug: false,

    // 监控网站性能
    oneapm_key: 'XApSBgxfAQEe3e1DTV9HCVUfDR9f57BfCR0LVgQBG7a12lEFH1QOH1FUe93cAlMcCVUYBQM=',

    // 站点端口
    port: 3000,

    // 数据库连接字符串
    db: "mongodb://localhost/test",

    // session的密钥字符
    session_secret: 'soofruit_secret_dev',

    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,

    // 文件上传限制
    file_limit: '1MB',

    // 图片上传路径
    upload_directory: "./assets/imgs/upload",

    // 微信
    WeChat: {
        // 公众号ID
        appID: "wx36418b8bcd9f8c8a",
        // 公众号密钥
        appSecret: "f5e38fb6f3f29d7ae73004b106f8de45",
        // 公众号预设Token    
        token: "Soostep123"
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

config.debug = process.env.NODE_ENV || 'DEV' === 'DEV';

module.exports = config;