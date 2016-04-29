var app = angular.module('mobile');

app.controller('My', function ($scope, AccountSvc) {
    document.title = '个人中心';

    AccountSvc.getUserInfo().then(function (result) {
        $scope.userInfo = result;
    });

    $scope.formatDate = function (datetime) {
        var date = new Date(datetime);
        return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
    }
});