var httpSuccess = function (result, defer, withData) {
    if (result.code == 0) {
        if (withData)
            defer.resolve(result.data);
        else
            defer.resolve(result.msg);
    }
    else {
        if (result.code == 100)     //自定义错误,直接显示
            showInfo(result.msg);
        else if (result.code == 400)//多条错误,多行显示
            showInfo(alignMsgs(result.msg));
        else if (result.code == 500)//其它
        //showInfo("服务器异常,请稍候重试");
            showInfo(JSON.stringify(result.msg));

        defer.reject();
    }
};

var alignMsgs = function (msgs) {
    return msgs.map(function (item) {
        return item.msg;
    }).join('<br/>');
};

var delay = function (func) {
    setTimeout(func, 50);
};

var showConfirm = function (info) {
    $('#dialogConfirm p').text(info);
    $('#dialogConfirm').modal('show');
};

var hideConfirm = function () {
    $('#dialogConfirm').modal('hide');
};