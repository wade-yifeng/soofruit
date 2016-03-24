/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile');

app.controller('Category', function ($scope, $http) {
    document.title = 'Category';

    $http.get('/goodCategories').success(function (result) {
        $scope.goodCategories = result;
    });
});