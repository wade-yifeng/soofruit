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
            $scope.address = address;
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
        $state.go('checkout.addressSelect');
        showAddressDialog();
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

        // 生成订单

        // 支付

    };

    $scope.updateParentAddress = function (address) {
        $scope.address = {};
        $scope.address = address;
    };

    var setTotalAmount = function () {
        $scope.totalAmount = getTotalAmount($scope.cart.goods);
    };
});