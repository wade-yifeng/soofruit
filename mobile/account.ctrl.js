var app = angular.module('mobile');

app.controller('My', function ($scope, AccountSvc) {
    document.title = '个人中心';

    AccountSvc.getUserInfo().then(function (result) {
        $scope.userInfo = result;
    });
});