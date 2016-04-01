/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile');

app.controller('Cart', function ($scope, GlobalCartSvc, $http, $routeParams, $cookies) {
    document.title = 'Cart';
    activateNavItem('#cart');

    $scope.isEdit = false;
    $scope.totalAmount = 0;
    GlobalCartSvc.initGlobalCart();

    var initPage = function () {
        if ($cookies.get('cart')) {
            $scope.cart = $cookies.getObject('cart');
            if ($scope.cart.goods.length > 0) {
                toggleCartDisplay(CartDisplayEnum.Buy);
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

        $scope.calculateTotal();
    };

    $scope.calculateTotal = function () {
        var indexs = getGoodsToBuy();
        $scope.totalAmount = calcTotal($scope.cart.goods.filter(function (item) {
            return indexs.indexOf($scope.cart.goods.indexOf(item)) > -1;
        }));
    };

    $scope.buy = function () {
        var goodsToBuy = getGoodsToBuy();

        //判断商品是否存在,是否卖完

        //Other Things To Do
    };

    $scope.edit = function () {
        $scope.isEdit = !$scope.isEdit;
        var displayType = $scope.isEdit ? CartDisplayEnum.Edit : CartDisplayEnum.Buy;
        toggleCartDisplay(displayType);
        if (!$scope.isEdit) {
            $scope.goodsToDelete = [];
        }
    };

    $scope.delete = function () {
        var goodsToDelete = getGoodsToDelete();

        //To Do
    };

    var subChange = function (_id, factor) {
        $scope.cart.goods.forEach(function (good) {
            if (good.goodID == _id) good.quantity += factor;
        });
    };
});