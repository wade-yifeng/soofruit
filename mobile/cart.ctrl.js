var app = angular.module('mobile');

app.controller('Cart', function ($scope, CartSvc, $state) {
    activateNav('cart');
    $scope.checkedAll = false;
    $scope.totalAmount = 0;

    CartSvc.getCartSession().then(function (cart) {
        // Session有则直接用
        $scope.cart = cart;
        setAllChecked(false);
    }, function () {
        // Session没有则从数据库取并存Session
        CartSvc.get().then(function (cart) {
            $scope.cart = cart;
            CartSvc.setCartSession(cart);
            setAllChecked(false);
        });
    });

    $scope.checked = function (chief) {
        if (chief) {
            setAllChecked($scope.checkedAll);
        }
        setTotalAmount();
    };

    $scope.minus = function (good) {
        if (good.quantity > 1) {
            good.quantity -= 1;
            CartSvc.setCartSession($scope.cart).then(
                setTotalAmount,
                function () {
                    good.quantity += 1;
                });
        }
    };

    $scope.plus = function (good) {
        good.quantity += 1;
        CartSvc.setCartSession($scope.cart).then(
            setTotalAmount,
            function () {
                good.quantity -= 1;
            });
    };

    $scope.remove = function (good) {
        var originCart = $.extend(true, {}, $scope.cart);
        var idArr = getIdArrOfGoods($scope.cart.goods);
        $scope.cart.goods.splice(idArr.indexOf(good.goodID), 1);

        CartSvc.setCartSession($scope.cart).then(
            setTotalAmount,
            function () {
                $scope.cart = originCart;
            });
    };

    $scope.checkout = function () {
        if ($scope.totalAmount == 0) {
            showInfo('请至少选中一件商品');
        } else {
            CartSvc.setCartSession($scope.cart).then(function () {
                $state.go('checkout');
            });
        }
    };

    var setAllChecked = function (checked) {
        $scope.cart.goods.forEach(function (good) {
            good.checked = checked;
        })
    };

    var setTotalAmount = function () {
        $scope.totalAmount = getTotalAmount($scope.cart.goods);
    };
});