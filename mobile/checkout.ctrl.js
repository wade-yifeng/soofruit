var app = angular.module('mobile');

app.controller('Checkout', function ($scope, AddressSvc, ShareSvc, CartSvc, OrderSvc, CouponSvc, UserCouponSvc, $state) {
    document.title = '北海之南大果园 - 购物结算';
    $scope.state = 'checkout';

    ShareSvc.user().then(function (user) {
        AddressSvc.getDefault(user._id).then(function (address) {
            if (!address) {
                showInfo('请先添加一个收货地址');
                $scope.firstAddress = true;
                $state.go('checkout.addressEdit');
                showAddressDialog();
            } else {
                $scope.initialAddress = address;
            }
        });
    });

    CartSvc.getCartSession().then(function (cart) {
        $scope.originCart = cart;
        $scope.cart = $.extend(true, {}, cart);
        $scope.cart.goods = [];
        cart.goods.forEach(function (good) {
            if (good.checked) {
                $scope.cart.goods.push(good);
            }
        });
        setTotalAmount();
    });

    $scope.selectAddress = function () {
        $scope.redirect();
    };

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
        var orderAddress = $scope.getSelectedAddress();
        var couponDeduction = $scope.couponDeduction || 0;

        if (!orderAddress) {
            showInfo('请先添加或者选择一个收货地址');
            return;
        }

        // 生成订单
        ShareSvc.user().then(function (user) {
            OrderSvc.create({
                goods: $scope.cart.goods,
                userID: user._id,
                status: OrderStatus.AwaitPay,
                totalAmount: $scope.totalAmount,
                payAmount: $scope.totalAmount - couponDeduction,
                couponDeduction: couponDeduction,
                createTime: Date.now(),
                addressID: orderAddress._id
            }).then(function (orderID) {
                // 从购物车清除已买东西
                $scope.cart.goods.forEach(function (good) {
                    var idArr = getIdArrOfGoods($scope.originCart.goods);
                    $scope.originCart.goods.splice(idArr.indexOf(good.goodID), 1);
                });
                CartSvc.setCartSession($scope.originCart);

                // 支付

                // 更新订单

                // 增加结算记录

                // 用户积分增加

                // 判断积分及已有优惠券, 满足条件则赠送相应优惠券 (后面用JOB做)
                CouponSvc.listPointsExchange().then(function (coupons) {
                    var coupon;
                    coupons.forEach(function (item) {
                        if (item.minPoints <= $scope.totalAmount) {
                            coupon = item;
                        }
                    });
                    if (coupon) {
                        UserCouponSvc.create({
                            userID: user._id,
                            type: coupon.type,
                            amount: coupon.amount,
                            minPoints: coupon.minPoints,
                            status: CouponStatus.Usable
                        }).then(showInfo);
                    }
                });

                // 跳到订单详情
                $state.go('order', {orderID: orderID});
            });
        });
    };

    $scope.updateFirstAddressFlag = function (flag) {
        $scope.firstAddress = flag;
    };

    $scope.updateSelectedAddress = function (address) {
        $scope.address = address;
    };

    $scope.getSelectedAddress = function () {
        // 子scope无法更新由父scope初始化的父scope值initialAddress. 所以重选地址之后使用address.
        return $scope.address || $scope.initialAddress;
    };

    var setTotalAmount = function () {
        $scope.totalAmount = getTotalAmount($scope.cart.goods);
    };

    $scope.redirect = function (info, openAddressEdit) {
        if (info) {
            showInfo(info);
        }

        var target = openAddressEdit ? 'Edit' : 'Select';

        hideAddressDialog();
        $state.go('checkout.address' + target);
        // 多点几次会出bug,需要加载两次state
        setTimeout(function () {
            $state.go('checkout.address' + target);
            showAddressDialog();
        }, 500);
    };

    $scope.selectCoupon = function () {
        hideAddressDialog();
        $state.go('checkout.couponSelect');
        setTimeout(function () {
            $state.go('checkout.couponSelect');
            showAddressDialog();
        }, 500);
    };
});