var app = angular.module('mobile');

app.controller('My', function ($scope, ShareSvc) {
    document.title = '个人中心';

    ShareSvc.user().then(function (result) {
        $scope.userInfo = result;
    });

    $scope.formatDatetime = function (datetime) {
        return formatDatetime(datetime);
    }
});