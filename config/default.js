/*!     
 * 配置文件（开发环境）：
 * 1. 站点配置（端口，Host地址）       
 * 2. 数据库配置（mongodb，redis）
 * 3. 微信公众号配置       
 * 4. 微信开放平台配置      
*/
module.exports = {
    // 站点端口
    port: 3000,
    // 数据库连接字符串
    db : "mongodb://localhost/test",
    WeChat: {
        // 公众号ID
        appID: "wx94911ed9aa3ef58c",
        // 公众号密钥
        appSecret: "c2f8def6c499b979bc46f7beee43091d",
        // 公众号预设Token    
        token: "Soostep123",
        // 菜单配置
        menu: [
            {
                name: "优惠活动",
                sub_button: [
                    {
                        type: "message",
                        name: "测试",
                    }
                ]
            },
            {
                name: "进入商城",
                type: "link",
                name: "北海之南商城",
                url: "http://www.soofruit.com"
            },
            {
                name: "专享服务",
                sub_button: [
                    {
                      type: "link",
                      name: "快递查询",
                      baseURL: "http://www.kuaidi100.com/"
                    },
                    {
                      type: "link",
                      name: "联系老板娘",
                      baseURL: "http://wechat"
                    }
                ]
            }
        ]
    },
    OpenAPI: {
        authorizeURL: "https://open.weixin.qq.com/connect/oauth2/authorize",
        authorizeURLForWebsite: "https://open.weixin.qq.com/connect/qrconnect",
        oauth2URL: "https://api.weixin.qq.com/sns/oauth2/access_token",
        oauth2RefreshURL: "https://api.weixin.qq.com/sns/oauth2/refresh_token",
        authURL: "https://api.weixin.qq.com/sns/auth"
    }
}