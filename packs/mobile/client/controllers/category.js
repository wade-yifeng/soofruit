/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile');

app.controller('Category', function ($scope, GlobalCartSvc, $http) {
    document.title = 'Category';
    GlobalCartSvc.initGlobalCart();

    $http.get('/goodCategories').success(function (result) {
        $scope.goodCategories = result;
    });
});