var activateNav = function (index) {
    delay(function () {
        $('.nav-fixed .fixed-nav-item-orders').eq(index).addClass('nav-cur').siblings().removeClass('nav-cur');
    });
};