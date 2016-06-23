// gulp压缩并放入$templateCache
angular.module('templates', []);

var app = angular.module('soofruit', ['ui.router', 'templates']);

app.controller('IndexController', IndexController);
// Service通用Promise封装
app.factory('Promise', PromiseService);
// Service通用$http.get封装
app.factory('HttpGet', HttpGetService);
app.factory('HttpPost', HttpPostService);
// 首页的业务逻辑
app.factory('Index', IndexService);

// 通用組件
app.directive('scroller', ngScrollerDirective);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/index/');

    $stateProvider
        .state('index', {
            url: '/index/',
            views: {
                '' : {
                    templateUrl: '/views/index.html'
                },
                'subjects@index': {
                    templateUrl: '/views/section/subject.html'
                }
            }
        });
});

app.run(function ($rootScope, $urlRouter, $timeout) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        //设置此标志位,用来在state加载完成之前显示加载动画
        $rootScope.stateIsLoading = true;
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
        $rootScope.stateIsLoading = false;
        $timeout(function() {
            Soofruit.App.activeFooterMenu(toState.name);
        }, 0);
    });
});