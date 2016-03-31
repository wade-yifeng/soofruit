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
                setCartGoodsCount(0, true);
                $cookies.getObject('cart').goods.forEach(function (good) {
                    setCartGoodsCount(good.quantity);
                });
            } else {
                return CartSvc.get('56fbda74ade860ca0d29226d').then(function (cart) {
                    if (cart != null) {
                        $cookies.putObject('cart', cart);
                        setCartGoodsCount(0, true);
                        cart.goods.forEach(function (good) {
                            setCartGoodsCount(good.quantity);
                        });
                    }
                });
            }
        },
        /**
         * 添加某商品或增加已有数量到购物车
         * @param goodID
         */
        addGoodToCart: function (goodID, isDecrease) {
            if ($cookies.get('cart')) {
                var cart = $cookies.getObject('cart');

                this._updateCartAndCookie(cart, goodID, isDecrease);
            } else {
                CartSvc.get('56fbda74ade860ca0d29226d').then(function (result) {
                    //cart不存在则新建
                    if (result == null) {
                        GoodSvc.get(goodID).then(function (result) {
                            if (!result.code) {
                                CartSvc.create('56fbda74ade860ca0d29226d', result)
                                    .then(function (cart) {
                                        $cookies.putObject('cart', cart);
                                        setCartGoodsCount(cart.goods[0].quantity, true);
                                    });
                            }
                        });
                    }
                    //cart存在,添加或更新goods
                    else if (!result.code) {
                        this._updateCartAndCookie(result, goodID, isDecrease);
                    }
                });
            }
        },
        /**
         * 私有方法:更新数据库和Cookie中的购物车
         * @param cart
         * @param goodID
         * @private
         */
        _updateCartAndCookie: function (cart, goodID, isDecrease) {
            var isGoodFound = false;
            var factor = isDecrease ? -1 : 1;

            setCartGoodsCount(0, true);
            cart.goods.forEach(function (good) {
                if (good.goodID == goodID) {
                    good.quantity += factor;
                    isGoodFound = true;
                }
                setCartGoodsCount(good.quantity);
            });
            if (!isGoodFound) {
                GoodSvc.get(goodID).then(function (result) {
                    if (!result.code) {
                        cart.goods.push({
                            goodID: goodID,
                            name: result.name,
                            price: result.price,
                            pic: result.pics[0],
                            quantity: 1
                        });
                        setCartGoodsCount(1);
                    }

                    CartSvc.update(cart).then(function () {
                        $cookies.putObject('cart', cart);
                    });
                });
            } else {
                CartSvc.update(cart).then(function () {
                    $cookies.putObject('cart', cart);
                });
            }
        }
    }
});