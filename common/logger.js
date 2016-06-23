var log4js = require('log4js');
var moment = require('moment');

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'logs/app-' + moment().format('YYYYMMDD') + '.log', category: 'soofruit' }
    ]
});

var logger = log4js.getLogger('soofruit');
logger.setLevel('DEBUG');

module.exports = logger;