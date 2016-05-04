function initUICommon(toState) {
    $('#go_to_top').css({bottom: '-100px'});
    toState == 'my' ? $('#go_to_my').hide() : $('#go_to_my').show();
}

$(document).ready(function () {
    //初始化边缘按钮
    var btn = $('#go_to_top');
    var page = $(this);
    var shown = false;
    var hidden = false;

    if (page.scrollTop() <= 200)
        btn.css({bottom: '-100px'});

    page.scroll(function () {
        if (!shown && page.scrollTop() > 200) {
            btn.animate({bottom: '176px'}, 1000);
            shown = true;
            hidden = false;
        } else if (!hidden && page.scrollTop() <= 200) {
            btn.animate({bottom: '-100px'}, 1000);
            shown = false;
            hidden = true;
        }
    });

    btn.click(function () {
        $('body').animate({scrollTop: 0}, 300);
    });
});

function activateSlider() {
    $('.flexslider').flexslider({
        animation: 'slide',
        directionNav: false,
        animationLoop: true,
        slideshowSpeed: 3000,
        pauseOnAction: true,
        pauseOnHover: true,
        touch: true
    });
}

function initCartIcon(cart, showDirectly) {
    if ((cart && cart.goods.length > 0) || showDirectly) {
        $('#go_cart').show();
    }
    else {
        $('#go_cart').hide();
    }
}

function activateNav(type) {
    var index;
    delay(function () {
        if (type == 'cart') {
            document.title = '我的购物车';
            index = 0;
        } else if (type == OrdersListType.Ongoing) {
            document.title = '我的未完成订单';
            index = 1;
        } else if (type == OrdersListType.Done) {
            document.title = '我的已完成订单';
            index = 2;
        } else if (type == OrdersListType.All) {
            document.title = '我的全部订单';
            index = 3;
        }

        $('.nav-fixed .fixed-nav-item-orders').eq(index).addClass('nav-cur').siblings().removeClass('nav-cur');
    });
}

function showInfo(info) {
    $('.pin-toast').html(info).fadeIn(1000, function () {
        setTimeout(function () {
            $('.pin-toast').fadeOut(1000);
        }, 1000);
    });
}

function showAddressDialog() {
    $('#dialogAddress').modal('show');
}

function hideAddressDialog() {
    $('#dialogAddress').modal('hide');
}

$('body').on('click', '.wx_bar_back', function () {
    $('#dialogAddress').modal('hide');
    $('.modal-backdrop').remove();
});

function getIdArrOfGoods(goods) {
    return goods.map(function (good) {
        return good.goodID;
    });
}

function getTotalAmount(goods) {
    var total = 0;
    goods.forEach(function (good) {
        if (good.checked) {
            total += good.sellPrice * good.quantity;
        }
    });
    return total;
}

function getOrderStatusInfo(status) {
    if (status == OrderStatus.Cancelled) {
        return {shortName: '已取消', longName: '订单已取消', imgClass: 'order_cancel'};
    } else if (status == OrderStatus.AwaitPay) {
        return {shortName: '待付款', longName: '等待买家付款', imgClass: 'order_unpay'};
    } else if (status == OrderStatus.Payed) {
        return {shortName: '已付款', longName: '订单已付款,等待卖家发货', imgClass: 'order_payed'};
    } else if (status == OrderStatus.AwaitPick) {
        return {shortName: '已发货', longName: '订单已发货,等待买家确认收货', imgClass: 'order_receive'};
    } else if (status == OrderStatus.Done) {
        return {shortName: '已完成', longName: '订单已成交', imgClass: 'order_received'};
    }
}

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