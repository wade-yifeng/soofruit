/**
 * Created by xz_liu on 2016/3/31.
 */
var app = angular.module('mobile');

app.controller('Account', function ($scope, GlobalCartSvc, $http, $cookies) {
    document.title = 'Account';
    activateNavItem('#account');
    GlobalCartSvc.initGlobalCart();
});