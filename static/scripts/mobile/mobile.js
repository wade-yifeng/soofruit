var initCartIcon = function (isToShow) {
    if (isToShow) {
        $('#go_cart').show();
    }
    else {
        $('#go_cart').hide();
    }
};

var activateNav = function (index) {
    delay(function () {
        $('.nav-fixed .fixed-nav-item-orders').eq(index).addClass('nav-cur').siblings().removeClass('nav-cur');
    });
};

var showInfo = function (info) {
    $('.pin-toast').html(info).fadeIn(1000, function () {
        setTimeout(function () {
            $('.pin-toast').fadeOut(1000);
        }, 1000);
    });
};

var getIdArrOfGoods = function (goods) {
    return goods.map(function (good) {
        return good.goodID;
    });
};

var getTotalAmount = function (goods) {
    var total = 0;
    goods.forEach(function (good) {
        if (good.checked) {
            total += good.sellPrice * good.quantity;
        }
    });
    return total;
};

//#######################模拟Checkbox Group#######################
$('body').on('click', '.cart-checkbox-real', function () {
    var items = $('.cart-checkbox-wrapper .item');
    var itemsChecked = $('.cart-checkbox-wrapper .item:checked');
    var chief = $('.cart-checkbox-wrapper .chief');

    if ($(this).is(':checked')) {
        if ($(this).hasClass('chief')) {
            _selectOthers(items);
        }
        else {
            if (items.length == itemsChecked.length) {
                _selectOthers(chief);
            }
        }
        _selectSelf(this);
    } else {
        if ($(this).hasClass('chief')) {
            _deselectOthers(items);
        }
        else {
            if (items.length == itemsChecked.length + 1) {
                _deselectOthers(chief);
            }
        }
        _deselectSelf(this);
    }
});

var _selectOthers = function (target) {
    $(target).prop({checked: true});
    $(target).siblings('.cart-checkbox-fake').css('color', '#666');
};

var _deselectOthers = function (target) {
    $(target).prop({checked: false});
    $(target).siblings('.cart-checkbox-fake').css('color', '#FFF');
};

var _selectSelf = function (target) {
    $(target).siblings('.cart-checkbox-fake').css('color', '#666');
};

var _deselectSelf = function (target) {
    $(target).siblings('.cart-checkbox-fake').css('color', '#FFF');
};
//###############################################################