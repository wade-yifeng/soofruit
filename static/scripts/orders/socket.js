/**
 * Created by xz_liu on 2016/3/14.
 */

// 需要替换为服务器地址
var socket = io.connect('http://localhost:3000/');

socket.on('notify', function (data) {
    $("#socketinfo")
        .html('<div class="btn btn-success" style="position:fixed;">' + data.msg + '</div>').fadeIn(3000, function () {
        $("#socketinfo").fadeOut(1000);
    });
});