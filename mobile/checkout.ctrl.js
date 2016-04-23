var app = angular.module('mobile');

app.controller('Checkout', function ($scope, CartSvc, AddressSvc, ShareSvc, $state) {
    document.title = '北海之南大果园 - 购物结算';
    $scope.state = 'checkout';

    AddressSvc.getDefault(ShareSvc.UserID).then(function (address) {
        if (!address) {
            showInfo('请先添加一个收货地址');
            $scope.firstAddress = true;
            $state.go('checkout.addressEdit');
            showAddressDialog();
        } else {
            $scope.initialAddress = address;
        }
    });

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

    $scope.selectAddress = function () {
        showAddressDialog();
        $state.go('checkout.addressSelect');
        // 多点几次会出bug,需要加载两次state
        delay(function () {
            $state.go('checkout.addressSelect');
        });
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
        // 子scope无法更新由父scope初始化的父scope值initialAddress. 所以重选地址之后使用address.
        var orderAddress = $scope.getSelectedAddress();

        // 生成订单

        // 支付

        // 支付成功更新订单
    };

    $scope.updateSelected = function (address) {
        $scope.address = address;
    };

    $scope.getSelectedAddress = function () {
        return $scope.address || $scope.initialAddress;
    };

    var setTotalAmount = function () {
        $scope.totalAmount = getTotalAmount($scope.cart.goods);
    };
});