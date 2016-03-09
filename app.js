/**
 * Created by xz_liu on 2016/3/8.
 */
var express = require('express');
var config = require('./config');

var app = new express();

app.engine('html', require('ejs-mate'))
    .use('/', require('./service_router'))
    .use(express.static('angular'))
    .use(express.static('controllers'))
    .use(express.static('public'))
    .use(express.static('templates'));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(config.port, function () {
    console.log('Site is up on http://localhost:3000/')
});