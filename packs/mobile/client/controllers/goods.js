/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile');

app.controller('Goods', function ($scope, GlobalCartSvc, $http, $routeParams) {
    document.title = 'Goods List';
    activateNavItem('#category');

    GlobalCartSvc.initGlobalCart();
    $scope.category = $routeParams.category;

    $http.get('/goods?category=' + $scope.category).success(function (result) {
        if (!result.code) {
            $scope.goods = result;
        }
    });

    $scope.addToCart = function (_id, isToAdd) {
        if (!isToAdd) return;
        GlobalCartSvc.addGoodToCart(_id);
    };
});