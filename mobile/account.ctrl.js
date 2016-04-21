var app = angular.module('mobile');

app.controller('My', function ($scope, AccountSvc, $state) {
    document.title = '个人中心';

    AccountSvc.getUser().then(function (result) {
        $scope.userInfo = result;
        showInfo(result);
    });
});