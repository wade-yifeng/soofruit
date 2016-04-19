var app = angular.module('mobile');

app.controller('Detail', function ($scope, GoodSvc, $stateParams) {
    document.title = '欢迎来到北海之南大果园';

    GoodSvc.get($stateParams.goodID).then(function (result) {
        $scope.good = result;
    });
});