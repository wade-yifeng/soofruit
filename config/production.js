/*!     
 * 配置文件（发布环境）：
 * 1. 站点配置（端口，Host地址）       
 * 2. 数据库配置（mongodb，redis）
 * 3. 微信公众号配置       
 * 4. 微信开放平台配置      
 */
module.exports = {
    // 是否调试状态
    debug: false,

    // 站点端口
    port: 80,

    // 网站的域名
    host: 'soofruit.com',

    // 监控网站性能
    oneapm_key: 'XApSBgxfAQEe3e1DTV9HCVUfDR9f57BfCR0LVgQBG7a12lEFH1QOH1FUe93cAlMcCVUYBQM=',

    // 微信
    WeChat: {
        // 公众号ID
        appID: "wx36418b8bcd9f8c8a",
        // 公众号密钥
        appSecret: "f5e38fb6f3f29d7ae73004b106f8de45",
        // 公众号预设Token
        token: "Soostep123"
    }
};