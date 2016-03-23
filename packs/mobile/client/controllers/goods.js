/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile');

app.controller('Goods', function ($scope, $http, $routeParams) {
    document.title = 'Goods List';
    $scope.category = $routeParams.category;

    $http.get('/goods?category=' + $scope.category).success(function (result) {
        if (!result.code) {
            $scope.goods = result;
        }
    });
});