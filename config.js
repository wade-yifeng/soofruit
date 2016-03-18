/*!
 * 根据指定环境加载Config
 */
var default_config = require('./default.json');

module.exports = function() {
	var version = (process.env.NODE_ENV || 'develop').toLowerCase(), ver_config, config;
    try {
        ver_config = require('./config/' + version);
    } catch (err) {
        console.log("Cannot find version " + version + " config file!!!");
        process.exit(-1);
    }

    config = _.extend({ 'version' : version }, default_config, ver_config);

    return config;
}


 * 1. 站点配置（端口，Host地址）
 * 2. 数据库配置（mongodb，redis）
{
	
}