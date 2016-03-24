/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('admin', ['ngRoute', 'ngFileUpload']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/good', {
            controller: 'Good',
            templateUrl: 'pages/admin_good.html'
        })
        .when('/dic', {
            controller: 'Dic',
            templateUrl: 'pages/admin_dic.html'
        })
        .when('/strategy', {
            controller: 'strategyCtrl',
            templateUrl: 'pages/admin_strategy_index.html'
        })
        .otherwise({
            redirectTo: '/good'
        });
});