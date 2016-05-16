var app = angular.module('mobile', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/list/');

    $stateProvider
        .state('list', {
            url: '/list/',
            controller: 'List',
            templateUrl: '/views/list.html'
        });

    // $urlRouterProvider.otherwise('/index');

    // $stateProvider
    //     .state('index', {
    //         url: '/index',
    //         controller: 'IndexController',
    //         views: {
    //            "subjects": {
    //                templateUrl: '/views/section/subject.html'
    //            }
    //            /* ,
    //            "products": {
    //                templateUrl: '/views/section/product.html'
    //            }
    //            */
    //         }
    //     });
});