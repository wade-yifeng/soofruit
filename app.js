/**
 * Created by xz_liu on 2016/3/8.
 */
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var app = new express();

app.engine('html', require('ejs-mate'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(express.static('assets'));


// 添加模板文件夹到这里, 模板文件不要重名.
app.use(express.static('packs/shared/client/templates/'))
    .use(express.static('packs/orders/client/templates/'));


// 添加服务器端路由到这里.
app.use('/', require('./packs/orders/server/routes'));


app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(config.port, function () {
    console.log('Site is up on http://localhost:' + config.port);
});