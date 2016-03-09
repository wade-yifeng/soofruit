/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('app', [
    'ngRoute'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/order/create', {
            controller: 'OrderCreate',
            templateUrl: '/order/create.html'
        })
        .when('/order/detail/:_id', {
            controller: 'OrderDetail',
            templateUrl: '/order/detail.html'
        })
        .otherwise({
            redirectTo: '/order/create'
        });
});