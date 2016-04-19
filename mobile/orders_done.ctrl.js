var app = angular.module('mobile');

app.controller('OrdersDone', function ($scope, GoodSvc, $stateParams) {
    document.title = '我的已完成订单';
    activateNav(2);
});