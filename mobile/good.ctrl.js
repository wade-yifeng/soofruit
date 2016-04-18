var app = angular.module('mobile');

app.controller('Good', function ($scope, GoodSvc) {
    document.title = '欢迎来到北海之南大果园';

    GoodSvc.listPaged(1).then(function (result) {
        $scope.goods = result.data;
    });
});