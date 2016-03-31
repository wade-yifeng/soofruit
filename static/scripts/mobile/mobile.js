//设置nav上面购物车内商品总数
var setCartGoodsCount = function (increment, doesInitialize) {
    var startValue = doesInitialize ? 0 : parseInt($('.J-shoping-num').text());
    $('.J-shoping-num').text(startValue + increment);
};

var calcTotal = function (goods) {
    var total = 0;
    goods.forEach(function (good) {
        total += good.price * good.quantity;
    });
    return total;
};

var getGoodsToBuy = function () {
    var indexs = [];
    $('.js-cart-checkbox-select-buy input').each(function () {
        if ($(this).is(':checked')) {
            indexs.push($(this).attr('index'));
        }
    });
    return indexs;
};

var getGoodsToDelete = function () {
    var indexs = [];
    $('.js-cart-checkbox-select-delete input').each(function () {
        if ($(this).is(':checked')) {
            indexs.push($(this).attr('index'));
        }
    });
    return indexs;
};

$('#nav li').click(function () {
    $(this).addClass('on').siblings().removeClass('on');
});
var activateNavItem = function (itemID) {
    $(itemID).addClass('on').siblings().removeClass('on');
};

$("body").on("touchend click", ".Q-buy-btn", function () {
    if ($(this).parents('.pro_l_right').hasClass('product-element-nosale')) return false;

    var cart_btn = $('.nav3sty');
    var imgtofly = $(this).parents('.listpage').find('a img.pro').eq(0);
    if (imgtofly[0]) {
        var imgclone = imgtofly.clone()
            .offset({top: imgtofly.offset().top, left: imgtofly.offset().left})
            .css({
                'opacity': '0.8',
                'position': 'absolute',
                'height': '210px',
                'width': '210px',
                'z-index': '1000',
                'border-radius': '50%'
            })
            .appendTo($('body'))
            .animate({
                'top': cart_btn.offset().top + 25,
                'left': cart_btn.offset().left + 25,
                'width': 55,
                'height': 55
            }, 500);
        imgclone.animate({
            'width': 0,
            'height': 0,
            'top': cart_btn.offset().top,
            'left': cart_btn.offset().left + 42
        }, function () {
            $(this).detach()
        });
    }
    return false;
});

var CartDisplayEnum = {
    Empty: 0,
    Buy: 1,
    Edit: 2
};

var toggleCartDisplay = function (displayType) {
    if (displayType == CartDisplayEnum.Empty) {
        $('.js-cart-empty').show();

        $('.js-cart-edit-btn').hide();
        $('.js-cart-nonempty').hide();

        $('.js-cart-bottom-checkout').hide();
        $('.js-cart-checkbox-select-buy').hide();

        $('.js-cart-bottom-edit').hide();
        $('.js-cart-checkbox-select-delete').hide();
    } else if (displayType == CartDisplayEnum.Buy) {
        $('.js-cart-empty').hide();

        $('.js-cart-edit-btn').show();
        $('.js-cart-nonempty').show();

        $('.js-cart-bottom-checkout').show();
        $('.js-cart-checkbox-select-buy').show();

        $('.js-cart-bottom-edit').hide();
        $('.js-cart-checkbox-select-delete').hide();
    } else if (displayType == CartDisplayEnum.Edit) {
        $('.js-cart-empty').hide();

        $('.js-cart-edit-btn').show();
        $('.js-cart-nonempty').show();

        $('.js-cart-bottom-checkout').hide();
        $('.js-cart-checkbox-select-buy').hide();

        $('.js-cart-bottom-edit').show();
        $('.js-cart-checkbox-select-delete').show();
    }
};

$("body").on("touchend click", ".checkout-cart .checked_input", function () {
    var label = $(this).siblings('label').eq(0);
    if ($(this).is(':checked')) {
        $(label).removeClass('input_checked_no').addClass('input_checked_yes');
    } else {
        $(label).removeClass('input_checked_yes').addClass('input_checked_no');

        var ovarallCheckInput;
        if ($(label).parent('.js-cart-checkbox-select-buy').length > 0) {
            ovarallCheckInput = $('.js-cart-bottom-checkout .checked_input');
        } else if ($(label).parent('.js-cart-checkbox-select-delete').length > 0) {
            ovarallCheckInput = $('.js-cart-bottom-edit .checked_input');
        }
        $(ovarallCheckInput).siblings('label').eq(0).removeClass('input_checked_yes').addClass('input_checked_no');
    }
});

$("body").on("touchend click", ".js-cart-bottom-checkout .checked_input", function () {
    var labels = $('.js-cart-checkbox-select-buy label');
    if ($(this).is(':checked')) {
        $(labels).removeClass('input_checked_no').addClass('input_checked_yes');
    } else {
        $(labels).removeClass('input_checked_yes').addClass('input_checked_no');
    }
});

$("body").on("touchend click", ".js-cart-bottom-edit .checked_input", function () {
    var labels = $('.js-cart-checkbox-select-delete label');
    if ($(this).is(':checked')) {
        $(labels).removeClass('input_checked_no').addClass('input_checked_yes');
    } else {
        $(labels).removeClass('input_checked_yes').addClass('input_checked_no');
    }
});