/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('app', [
    'ngRoute',
    'orderController'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/order/create',
            {
                controller: 'OrderCtrl',
                templateUrl: '/order/create.html'
            })
        .otherwise({
            redirectTo: '/order/create'
        });
});