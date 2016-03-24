GLOBAL._ = require('underscore');
var express = require('express');
var http = require('http');
var config = require('config');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var socket = require('./packs/shared/socket');

var app = new express();
var server = http.Server(app);

app.engine('html', require('ejs-mate'))
    .set('views', './assets/pages')
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(multipart({uploadDir: config.UploadDir}))
    .use(express.static('assets'))
    .use(express.query());

// 服务器端路由
app.use('/', require('./packs/admin/server/routes'))
    .use(require('./packs/orders/server/routes'))
    .use(require('./wechat/routes'));

// 子站点主页映射
app.get('/', function (req, res) {
    //console.log(req);
    res.render('index.html');
}).get('/pc', function (req, res) {
    //console.log(req);
    res.render('orders_index.html');
}).get('/admin', function (req, res) {
    //console.log(req);
    res.render('admin_index.html');
});

// 启动socket
socket.initSocket(server);

server.listen(config.port, function () {
    console.log('Site is up on http://localhost:' + config.port);
});