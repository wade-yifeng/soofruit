var app = angular.module('mobile');

app.controller('Checkout', function ($scope, CheckoutSvc, CartSvc) {
    document.title = '北海之南大果园 - 购物结算';

    CartSvc.getCartSession().then(function (cart) {
        $scope.cart = $.extend(true, {}, cart);
        $scope.cart.goods = [];
        cart.goods.forEach(function (good) {
            if (good.checked) {
                $scope.cart.goods.push(good);
            }
        });
        setTotalAmount();
    });

    $scope.minus = function (good) {
        if (good.quantity > 1) {
            good.quantity -= 1;
        }
        setTotalAmount();
    };

    $scope.plus = function (good) {
        good.quantity += 1;
        setTotalAmount();
    };

    $scope.pay = function () {

        // 生成订单

        // 支付

    };

    var setTotalAmount = function () {
        $scope.totalAmount = getTotalAmount($scope.cart.goods);
    };
});