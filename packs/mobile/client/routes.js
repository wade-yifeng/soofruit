/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('mobile', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'Home',
            templateUrl: 'pages/home.html'
        })
        .when('/category', {
            controller: 'Category',
            templateUrl: 'pages/category.html'
        })
        .when('/goods/:category', {
            controller: 'Goods',
            templateUrl: 'pages/goods.html'
        })
        .when('/cart', {
            controller: 'Cart',
            templateUrl: 'pages/cart.html'
        })
        .when('/account',{
            controller: 'Account',
            templateUrl: 'pages/account.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});