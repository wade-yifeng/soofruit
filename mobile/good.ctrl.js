var app = angular.module('mobile');

app.controller('Detail', function ($scope, $stateParams, GoodSvc, CartSvc) {
    GoodSvc.get($stateParams.goodID).then(function (result) {
        $scope.good = result;
        document.title = result.name;
    });

    CartSvc.getCartSession().then(function () {
            initCartIcon(true);
        },
        initCartIcon);

    $scope.addToCart = function (good) {
        CartSvc.addToCart(good).then(function () {
            initCartIcon(true);
        });
    };
});