/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('admin', [
    'ngRoute'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/fruit', {
            controller: 'Fruit',
            templateUrl: 'pages/admin_fruit.html'
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
            redirectTo: '/fruit'
        });
});