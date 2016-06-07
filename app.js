// JS基础类库
GLOBAL._ = require('underscore');

// 需首先加载config
var config = require('config');

if (!config.debug && config.oneapm_key) {
    // 性能监控
    require('oneapm');
}

// 设置控制台颜色，用于调试和监控
require('colors');

var express = require('express');
var session = require('express-session');
// CSRF（Cross-site request forgery跨站请求伪造
var csurf = require('csurf');
var compress = require('compression');
var bodyParser = require('body-parser');
// CORS-CORS(跨来源资源共享)是一份浏览器技术的规范,
// 提供了Web服务从不同网域传来沙盒脚本的方法,以避开浏览器的同源策略,是JSONP模式的现代版。
var cors = require('cors');
// help secure Express/Connect apps with various HTTP headers
var helmet = require('helmet');
// Utility to parse a string bytes to bytes and vice-versa
var bytes = require('bytes');
var path = require('path');
// A streaming parser for HTML form data for node.js
var busboy = require('connect-busboy');
// connect-redis is a Redis session store backed by node_redis, and is insanely fast
// https://github.com/tj/connect-redis
var RedisStore = require('connect-redis')(session);
/* TODO: socket形式的逻辑待定
// socket = require('./common/socket');
*/
// 记录method,url,ip,time
var requestLog = require('./middlewares/request_log');
var logger = require('./common/logger');
// 打印 mongodb 查询日志
require('./middlewares/mongoose_log');
require('./models');
var auth = require('./middlewares/auth');
var appRouter = require('./routers/app_router');
var wechatRouter = require('./routers/wechat_router');
var errorPageMiddleware = require('./middlewares/error_page');
var api = require('./wechat/api');
// 获取主机名
var urlinfo = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

var app = express();

// public路径指向assets打包目录
app.use('/public', express.static(path.join(__dirname, 'assets')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

// 浏览器中计算和显示相应时间
app.use(require('response-time')());
// Only let me be framed by people of the same origin:
app.use(helmet.frameguard('sameorigin'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(require('method-override')());
// signed cookie support by passing a secret string
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());
app.use(session({
    secret: config.session_secret,
    store: new RedisStore({
        port: config.redis_port,
        host: config.redis_host,
    }),
    // Forces the session to be saved back to the session store, 
    // even if the session was never modified during the request. 
    resave: true,
    saveUninitialized: true,
}));

// 记录请求时间
app.use(requestLog);

if (config.debug) {
    // render时记录日志
    var renderMiddleware = require('./middlewares/render');
    // This middleware is only intended to be used in a development environment, 
    // as the full error stack traces and internal details of any object passed to this module will be 
    // sent back to the client when an error occurs.
    var errorhandler = require('errorhandler');

    // 记录渲染时间
    app.use(renderMiddleware.render);
    app.use(errorhandler());
} else {
    app.use(function (err, req, res, next) {
        logger.error(err);
        return res.status(500).send('500 status');
    });
    app.use(function (req, res, next) {
        if (req.path.indexOf('/wechat') === -1) {
            csurf()(req, res, next);
            return;
        }

        next();
    });
    app.set('view cache', true);
}

app.use(function (req, res, next) {
    // pass the csrfToken to the view
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});

app.use(busboy({
    limits: {
        fileSize: bytes(config.file_limit)
    }
}));

app.use(auth.authUser);

/* TODO: 封装数据库访问
var apiRouter = require('./api_router');
*/

// app.use('/api', cors(), apiRouter);
app.use('/', appRouter);
app.use('/wechat', wechatRouter);
// error handler
app.use(errorPageMiddleware.errorPage);

if (!module.parent) {
    // 启动server
    app.listen(config.port, function () {
        logger.info('Soofruit listening on port', config.port);
        logger.info('Be the better...');
        logger.info('http://' + config.hostname + ':' + config.port);
        api.createMenu(config.WeChat.menu, function(err) {
            if(err) {
                logger.error('创建菜单失败，错误：' + err);
            }
        });
    });
}

module.exports = app;

/* TODO: socket监听server
// socket.initSocket(server);
*/