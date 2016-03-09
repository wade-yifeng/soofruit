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
    .use(express.static('angular'))
    .use(express.static('controllers'))
    .use(express.static('public'))
    .use(express.static('templates'))
    .use('/', require('./service_router'));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(config.port, function () {
    console.log('Site is up on http://localhost:' + config.port);
});