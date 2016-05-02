function httpSuccess(result, defer, withData) {
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
}

function alignMsgs(msgs) {
    return msgs.map(function (item) {
        return item.msg;
    }).join('<br/>');
}

function delay(func) {
    setTimeout(func, 50);
}

function formatDatetime(datetime, showTime) {
    datetime = new Date(datetime);
    var result = datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
    if (showTime) {
        result += ' ' + datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds();
    }
    return result;
}

function showConfirm(info) {
    $('#dialogConfirm p').text(info);
    $('#dialogConfirm').modal('show');
}

function hideConfirm() {
    $('#dialogConfirm').modal('hide');
}