var app = angular.module('mobile');

app.controller('Account', function ($scope, AccountSvc, $state) {
    document.title = '个人中心';

    console.log(AccountSvc);
    var loadPersonalInfo = function () {
        AccountSvc.getUser().then(function (result) {
            $scope.userInfo = result;

        });
    };

    //页面初始化
    loadPersonalInfo();
});