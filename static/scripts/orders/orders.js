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

var setCartGoodsCount = function (increment, doesInitialize) {
    var startValue = doesInitialize ? 0 : parseInt($('.J-shoping-num').text());
    $('.J-shoping-num').text(startValue + increment);
};