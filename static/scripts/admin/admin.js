var showInfo = function (info) {
    $('#dialogInfo .modal-body p').text(info);
    $('#dialogInfo').modal('show');
};

var showConfirm = function (info) {
    $('#dialogConfirm .modal-body p').text(info);
    $('#dialogConfirm').modal('show');
};

var showValidationResult = function (msgs) {
    $('div.alert').empty();
    for (var i in msgs) {
        $('div.alert').append(msgs[i].msg);
        if (msgs.length > 1 && i < msgs.length - 1) $('div.alert').append('<br/>');
    }
    $('div.alert').show();
};

$('.sidebar-nav li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});