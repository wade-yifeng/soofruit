/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile');

app.controller('Cart', function ($scope, GlobalCartSvc, $http, $routeParams, $cookies) {
    document.title = 'Cart';
    GlobalCartSvc.initGlobalCart();

    var initPage = function () {
        if ($cookies.get('cart')) {
            $scope.cart = $cookies.getObject('cart');
            if ($scope.cart.goods.length > 0) {
                $('.js_cart_edit').show();
                $('.js_cart_empty').hide();
                $('.js_cart_nonempty').show();
                $('.js-cart-bottom-checkout').show();
            }
        }
    };

    if ($cookies.get('cart')) {
        initPage();
    } else {
        GlobalCartSvc.initGlobalCart().then(initPage);
    }

    $scope.changeQuantity = function (_id, quantity, isDecrease) {
        if (!isDecrease) {
            GlobalCartSvc.addGoodToCart(_id);
            subChange(_id, 1);
        }
        else if (quantity > 1) {
            GlobalCartSvc.addGoodToCart(_id, isDecrease);
            subChange(_id, -1);
        }
    };

    var subChange = function (_id, factor) {
        $scope.cart.goods.forEach(function (good) {
            if (good.goodID == _id) good.quantity += factor;
        });
    }
});