/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('admin', [
    'ngRoute'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/dic', {
            controller: 'Dic',
            templateUrl: 'pages/dic.html'
        })
        .otherwise({
            redirectTo: '/dic'
        });
});