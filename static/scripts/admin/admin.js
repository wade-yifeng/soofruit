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

var getPageArray = function (current, total) {
    var start = current > 5 ? current - 4 : 1;
    var end = total - current > 3 ? current + 4 : total;
    return _.range(start, end + 1);
};