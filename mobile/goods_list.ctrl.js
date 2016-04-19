var app = angular.module('mobile');

app.controller('List', function ($scope, GoodSvc, CartSvc) {
    document.title = '欢迎来到北海之南大果园';

    GoodSvc.listPaged(1).then(function (result) {
        $scope.goods = result.data;
    });

    CartSvc.getCartSession().then(function (cart) {
        initCartIcon(cart);
    });
});