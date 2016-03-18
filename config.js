/*!
 * 根据指定环境加载Config
 */
var default_config = require('./default.json');

module.exports = function() {
    debugger;
	var version = (process.env.NODE_ENV || 'develop').toLowerCase(), ver_config, config;
    try {
        ver_config = require('./config/' + version + '.json');
    } catch (err) {
        console.log("Cannot find version " + version + " config file!!!");
        process.exit(-1);
    }

    config = _.extend({ 'version' : version }, default_config, ver_config);

    return config;
}