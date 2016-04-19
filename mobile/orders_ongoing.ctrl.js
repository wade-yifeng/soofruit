var app = angular.module('mobile');

app.controller('OrdersOngoing', function ($scope, GoodSvc, $stateParams) {
    document.title = '未完成订单';
    activateNav(1);
});