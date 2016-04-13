var util = require('util');

var _socket;

module.exports.initSocket = function (server) {
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        _socket = socket;
    });
};

module.exports.notify = function (user) {
    // emit + broadcast.emit可以广播到所有打开网站的客户端
    _socket.emit('notify', {
        msg: util.format('User %s creates an order.', user)
    });
    _socket.broadcast.emit('notify', {
        msg: util.format('User %s creates an order.', user)
    });
};