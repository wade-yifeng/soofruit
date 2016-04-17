GLOBAL._ = require('underscore');
var express = require('express'),
    http = require('http'),
    config = require('config'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    multipart = require('connect-multiparty'),
    sessionStore = require('./lib/session_store'),
    socket = require('./lib/socket');

var app = express();

app.engine('html', require('ejs-mate'))
    .set('views', './assets/pages')
    .use(compression())
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(multipart({uploadDir: config.UploadDir}))
    .use(express.static('assets'))
    .use(express.query());

// 初始化Session Redis Store
sessionStore.initSessionStore(app);

// 服务器端路由
app.use('/', require('./routes_mobile'))
    .use(require('./routes_admin'))
    .use(require('./wechat/routes'));

// 站点主页映射
app.get('/', function (req, res) {
    res.render('index.html');
}).get('/admin', function (req, res) {
    res.render('admin_index.html');
});

// 启动server
var server = app.listen(config.port, function () {
    console.log('Site is up on http://localhost:' + config.port);
});

// socket监听server
socket.initSocket(server);