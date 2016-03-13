/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('app', [
    'ngRoute'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/order/index', {
            controller: 'OrderIndex',
            templateUrl: 'pages/orderindex.html'
        })
        .when('/order/create', {
            controller: 'OrderCreate',
            templateUrl: 'pages/ordercreate.html'
        })
        .when('/order/detail/:_id', {
            controller: 'OrderDetail',
            templateUrl: 'pages/orderdetail.html'
        })
        .otherwise({
            redirectTo: '/order/index'
        });
});