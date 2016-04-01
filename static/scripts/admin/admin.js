var showInfo = function (info) {
    $('#dialogInfo .modal-body p').text(info);
    $('#dialogInfo').modal('show');
};

var showConfirm = function (info) {
    $('#dialogConfirm .modal-body p').text(info);
    $('#dialogConfirm').modal('show');
};

var showValidationResult = function (msgs) {
    $('div.alert').html(
        msgs.map(function (item) {
            return item.msg;
        }).join('<br/>')
    ).show();
};

$('.sidebar-nav li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
});