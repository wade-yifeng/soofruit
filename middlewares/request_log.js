var logger = require('../common/logger');
var tools = require('../common/utility');

module.exports = function (req, res, next) {
    // Assets do not out log.
    if (/^\/public/.test(req.url)) {
        next();
        return;
    }

    var t = new Date();
    logger.info('\n\nStarted', tools.formatDate(t), req.method, req.url, req.ip);

    res.on('finish', function () {
        var duration = ((new Date()) - t);

        logger.info('Completed', res.statusCode, ('(' + duration + 'ms)').green);
    });

    next();
};
