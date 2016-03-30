/**
 * Created by xz_liu on 2016/3/30.
 */
var app = angular.module('mobile');

app.factory('GlobalCartSvc', function ($http, $cookies) {
    return {
        initGlobalCart: function () {
            if ($cookies.get('cart')) {
                $cookies.getObject('cart').goods.forEach(function (good) {
                    setCartGoodsCount(good.quantity, true);
                });
            } else {
                return $http.get('/cart/' + '56fb74df861ae4801e27a14a').success(function (result) {
                    if (!result.code) {
                        $cookies.putObject('cart', result);
                        result.goods.forEach(function (good) {
                            setCartGoodsCount(good.quantity, true);
                        });
                    }
                });
            }
        }, addGoodToCart: function (_id) {
            var cart = $cookies.getObject('cart');
            cart.goods.forEach(function (good) {
                if (good.goodID == _id) good.quantity += 1;
            });
            $http.put('/cart/' + cart.userID, cart).success(function (result) {
                if (result.code == 0) {
                    $cookies.putObject('cart', cart);
                    setCartGoodsCount(1);
                }
            });
        }
    }
});