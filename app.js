/**
 * Created by xz_liu on 2016/3/8.
 */
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var socket = require('./packs/shared/server/socket');
var config = require('./config');
var http = require("http");
var url = require("url");
var crypto = require("crypto");

var app = new express();
var server = http.Server(app);

app.engine('html', require('ejs-mate'))
    .set('views', './assets/pages')
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(express.static('assets'));


// 添加服务器端路由到这里.
app.use('/', require('./packs/orders/server/routes'));


app.get('/', function (req, res) {
    res.render('h5index.html');
}).get('/pc', function (req, res) {
    res.render('index.html');
}).get('/admin', function (req, res) {
    res.render('adminindex.html');
});


// 启动socket
socket.initSocket(server);


server.listen(config.port, function () {
    console.log('Site is up on http://localhost:' + config.port);
});


// 以下为微信公众号Token验证，暂时请保留
function sha1(str){
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

function validateToken(req,res){
  var query = url.parse(req.url,true).query;
  //console.log("*** URL:" + req.url);
  //console.log(query);
  var signature = query.signature;
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;
  var oriArray = new Array();
  oriArray[0] = nonce;
  oriArray[1] = timestamp;
  oriArray[2] = "Soostep123";
  oriArray.sort();
  var original = oriArray.join('');
  console.log("Original str : " + original);
  console.log("Signature : " + signature );
  var scyptoString = sha1(original);
  if(signature == scyptoString){
    res.end(echostr);
    console.log("Confirm and send echo back");
  }else {
    res.end("false");
    console.log("Failed!");
  }
}


var webSvr = http.createServer(validateToken);
webSvr.listen(8000,function(){
  console.log("Start validate");
});