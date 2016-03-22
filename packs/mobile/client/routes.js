/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'Home',
            templateUrl: 'pages/home.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});