/*!     
 * 配置文件（发布环境）：
 * 1. 站点配置（端口，Host地址）       
 * 2. 数据库配置（mongodb，redis）
 * 3. 微信公众号配置       
 * 4. 微信开放平台配置      
*/
module.exports = {
    // 站点端口
    port: 8000,
    // 数据库连接字符串
    db : "mongodb://localhost/test",
    WeChat: {
        // 公众号ID
        appID: "wx36418b8bcd9f8c8a",
        // 公众号密钥
        appSecret: "f5e38fb6f3f29d7ae73004b106f8de45",
        // 公众号预设Token
        token: "Soostep123"
    },
    OpenAPI: {
        
    }
}