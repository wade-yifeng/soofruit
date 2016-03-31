/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile');

app.controller('Home', function ($scope, GlobalCartSvc, $http, $cookies) {
    document.title = 'Home';
    activateNavItem('#home');
    GlobalCartSvc.initGlobalCart();
});