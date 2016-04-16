$('.sidebar-nav li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});

var showInfo = function (info) {
    $('#dialogInfo .modal-body p').html(info);
    $('#dialogInfo').modal('show');
};

var showConfirm = function (info) {
    $('#dialogConfirm .modal-body p').text(info);
    $('#dialogConfirm').modal('show');
};

var showValidationResult = function (msgs) {
    $('div.alert').html(alignMsgs(msgs)).show();
};

var editFormFlyIn = function () {
    $('#editForm').addClass('animated bounceInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $('#editForm').removeClass('animated bounceInUp')
    });
};

var httpSuccess = function (result, defer, withData) {
    if (result.code == 0) {
        if (withData)
            defer.resolve(result.data);
        else
            defer.resolve();
    }
    else {
        if (result.code < 100)      //自定义错误,直接显示
            showInfo(result.msg);
        else if (result.code == 400)//多条错误,多行显示
            showInfo(alignMsgs(result.msg));
        else if (result.code == 500)//其它
            showInfo("服务器异常,请稍候重试");

        defer.reject();
    }
};

var alignMsgs = function (msgs) {
    return msgs.map(function (item) {
        return item.msg;
    }).join('<br/>');
};

var delay = function (func) {
    setTimeout(func, 100);
};

var getPageArray = function (current, total) {
    var start = current > 5 ? current - 4 : 1;
    var end = total - current > 3 ? current + 4 : total;
    return _.range(start, end + 1);
};