var app = angular.module('admin', ['ui.router', 'ngFileUpload']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/good");

    $stateProvider
        .state('good', {
            url: "/good",
            controller: "Good",
            templateUrl: 'pages/admin_good.html'
        }).state('dic', {
            url: "/dic",
            controller: 'Dic',
            templateUrl: 'pages/admin_dic.html'
        })
        .state('user', {
            url: "/user",
            controller: 'userCtrl',
            templateUrl: 'pages/admin_user.html'
        })
        .state('usermanager', {
            url: "/usermanager",
            controller: 'UserManager',
            templateUrl: 'pages/admin_user_manager.html'
        })
        .state('permission', {
            url: "/permission",
            controller: 'PermissionManager',
            templateUrl: 'pages/admin_permission.html'
        });
});