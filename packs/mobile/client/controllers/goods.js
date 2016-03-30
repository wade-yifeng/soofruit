/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile');

app.controller('Goods', function ($scope, GlobalCartSvc, $http, $routeParams, $cookies) {
    document.title = 'Goods List';
    GlobalCartSvc.initGlobalCart();
    $scope.category = $routeParams.category;

    $http.get('/goods?category=' + $scope.category).success(function (result) {
        if (!result.code) {
            $scope.goods = result;
        }
    });

    $scope.addToCart = function (_id, isToAdd) {
        if (!isToAdd) return;

        if ($cookies.get('cart')) {
            GlobalCartSvc.addGoodToCart(_id);
        } else {
            GlobalCartSvc.initGlobalCart().then(function () {
                GlobalCartSvc.addGoodToCart(_id);
            });
        }
    };
});