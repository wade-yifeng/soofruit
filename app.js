// JS基础类库
GLOBAL._ = require('underscore');

// 需首先加载config
var config = require('config');

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
var multipart = require('connect-multiparty');
// TODO: socket形式的逻辑待定
// socket = require('./lib/socket');

var sessionStore = require('./lib/session_store');

// 记录method,url,ip,time
var requestLog = require('./middlewares/request_log');
var logger = require('./lib/logger');
// 打印 mongodb 查询日志
require('./middlewares/mongoose_log');
// require('./models');

// var auth = require('./middlewares/auth');
var errorPageMiddleware = require('./middlewares/error_page');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/views', express.static(path.join(__dirname, 'views')));
// 浏览器中计算和显示相应时间
app.use(require('response-time')());
// Only let me be framed by people of the same origin:
app.use(helmet.frameguard('sameorigin'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));
// signed cookie support by passing a secret string
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());
app.use(multipart({uploadDir: config.upload_directory}));
//app.use(express.query());

// 初始化Session Redis Store
sessionStore.initSessionStore(app);

// 记录请求时间
app.use(requestLog);

if (config.debug) {
    // 设置控制台颜色，用于调试和监控
    require('colors');
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
}

if (!config.debug) {
    app.use(function (req, res, next) {
        if (req.path === '/api' || req.path.indexOf('/api') === -1) {
            csurf()(req, res, next);
            return;
        }
        next();
    });
    app.set('view cache', true);
}

//app.use(function (req, res, next) {
//    // pass the csrfToken to the view
//    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
//    next();
//});

// 服务端路由
// 模块化加载所有的route(controllers, middlewares)
// app.use('/api/v1',  cors(), apiRouterV1);
//// TODO: Account需要跳转处理，等待之后拆分再统一Roote
//var account = require('./service/account');
//app.use('/account', account.signin);
app.use(require('./routes_mobile'));
app.use(require('./routes_admin'));
app.use(require('./wechat/routes'));

// error handler
app.use(errorPageMiddleware.errorPage);

// 站点主页映射
app.get('/', function (req, res) {
    if (req.session && req.session.fake && req.session.fake.user) {
        res.render('index.html');
    } else {
        res.redirect('/account?targetPage=home');
    }
}).get('/admin', function (req, res) {
    res.render('admin_index.html');
});

// 启动server
var server = app.listen(config.port, function () {
    logger.info('Site is up on http://localhost:' + config.port);
});

// socket监听server
// socket.initSocket(server);