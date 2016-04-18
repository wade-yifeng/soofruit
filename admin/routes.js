var app = angular.module('admin', ['ui.router', 'ngFileUpload']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/good");

    $stateProvider
        .state('good', {
            url: "/good",
            controller: "Good",
            templateUrl: '/views/admin_good.html'
        }).state('dic', {
            url: "/dic",
            controller: 'Dic',
            templateUrl: '/views/admin_dic.html'
        })
        .state('user', {
            url: "/user",
            controller: 'userCtrl',
            templateUrl: '/views/admin_user.html'
        })
        .state('usermanager', {
            url: "/usermanager",
            controller: 'UserManager',
            templateUrl: '/views/admin_user_manager.html'
        })
        .state('permission', {
            url: "/permission",
            controller: 'PermissionManager',
            templateUrl: '/views/admin_permission.html'
        });
});