var app = angular.module('mobile');

app.controller('My', function ($scope, ShareSvc, UserSvc) {
    document.title = '个人中心';

    ShareSvc.user().then(function (user) {
        $scope.userInfo = user;
    });

    $scope.showPoints = function () {
        UserSvc.getPoints($scope.userInfo._id).then(function (points) {
            showInfo('您拥有' + points + '可用积分');
        });
    };

    $scope.formatDatetime = function (datetime) {
        return formatDatetime(datetime);
    };
});