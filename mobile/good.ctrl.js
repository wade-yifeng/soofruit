var app = angular.module('mobile');

app.controller('Detail', function ($scope, $stateParams, GoodSvc, CartSvc) {
    GoodSvc.get($stateParams.goodID).then(function (result) {
        $scope.good = result;
        document.title = result.name;
        activateSlider();
    });

    CartSvc.getCartSession().then(function (cart) {
            initCartIcon(cart);
        },
        initCartIcon);

    $scope.addToCart = function (good) {
        CartSvc.addToCart(good).then(function () {
            initCartIcon(null, true);
        });
    };
});