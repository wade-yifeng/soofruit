/**
 * Created by xz_liu on 2016/3/14.
 */
var util = require('util');

var _socket;

module.exports.initSocket = function (server) {
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        _socket = socket;
    });
};

module.exports.notify = function (user) {
    _socket.emit('notify', {
        msg: util.format('User <b>%s</b> create an order.', user)
    });
};