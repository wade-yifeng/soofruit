var app = angular.module('admin', ['ui.router', 'ngFileUpload']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/good");

    $stateProvider
        .state('usermana', {
            url: "/usermana",
            controller: 'UserMana',
            templateUrl: '/views/admin_user_mana.html'
        })
        .state('good', {
            url: "/good",
            controller: "Good",
            templateUrl: '/views/admin_good.html'
        })
        .state('coupon', {
            url: "/coupon",
            controller: 'Coupon',
            templateUrl: '/views/admin_coupon.html'
        })
        .state('dic', {
            url: "/dic",
            controller: 'Dic',
            templateUrl: '/views/admin_dic.html'
        })
        .state('permission', {
            url: "/permission",
            controller: 'PermissionManager',
            templateUrl: '/views/admin_permission.html'
        });
});