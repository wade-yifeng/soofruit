/**
 * Created by xz_liu on 2016/3/30.
 */
var app = angular.module('mobile');

app.factory('GlobalCartSvc', function ($http, $cookies, GoodSvc, CartSvc) {
    return {
        /**
         * 打开view时初始化nav上面购物车内商品总数
         */
        initGlobalCart: function () {
            if ($cookies.get('cart')) {
                $cookies.getObject('cart').goods.forEach(function (good) {
                    setCartGoodsCount(good.quantity, true);
                });
            } else {
                CartSvc.get('56fbda74ade860ca0d29226d').then(function (cart) {
                    $cookies.putObject('cart', cart);
                    result.goods.forEach(function (good) {
                        setCartGoodsCount(good.quantity, true);
                    });
                });
            }
        },
        /**
         * 添加某商品或增加已有数量到购物车
         * @param _id
         */
        addGoodToCart: function (_id, isDecrease) {
            if ($cookies.get('cart')) {
                var cart = $cookies.getObject('cart');

                this._updateCartAndCookie(cart, _id, isDecrease);
            } else {
                CartSvc.get('56fbda74ade860ca0d29226d').then(function (result) {
                    //cart不存在则新建
                    if (result == null) {
                        GoodSvc.get(_id).then(function (result) {
                            if (!result.code) {
                                CartSvc.create('56fbda74ade860ca0d29226d', result)
                                    .then(function (cart) {
                                        $cookies.putObject('cart', cart);
                                        setCartGoodsCount(cart.goods.quantity, true);
                                    });
                            }
                        });
                    }
                    //cart存在,添加或更新goods
                    else if (!result.code) {
                        this._updateCartAndCookie(result, _id, isDecrease);
                    }
                });
            }
        },
        /**
         * 私有方法:更新购物车和Cookie
         * @param cart
         * @param _id
         * @private
         */
        _updateCartAndCookie: function (cart, _id, isDecrease) {
            var isGoodFound = false;
            var factor = isDecrease ? -1 : 1;

            cart.goods.forEach(function (good) {
                if (good.goodID == _id) {
                    good.quantity += factor;
                    isGoodFound = true;
                }
                setCartGoodsCount(good.quantity, true);
            });
            if (!isGoodFound) {
                GoodSvc.get(_id).then(function (result) {
                    if (!result.code) {
                        cart.goods.push({
                            goodID: _id,
                            name: result.name,
                            price: result.price,
                            pic: result.pics[0],
                            quantity: 1
                        });
                        setCartGoodsCount(1);
                    }
                });
            }

            CartSvc.update(cart).then(function () {
                $cookies.putObject('cart', cart);
            });
        }
    }
});