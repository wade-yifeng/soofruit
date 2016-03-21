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
            templateUrl: 'pages/orders_list.html'
        })
        .when('/order/create', {
            controller: 'OrderCreate',
            templateUrl: 'pages/orders_create.html'
        })
        .when('/order/detail/:_id', {
            controller: 'OrderDetail',
            templateUrl: 'pages/orders_detail.html'
        })
        .otherwise({
            redirectTo: '/order/index'
        });
});