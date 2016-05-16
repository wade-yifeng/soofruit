var app = angular.module('mobile');

app.run(function ($rootScope, $urlRouter) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        //设置此标志位,用来在state加载完成之前显示加载动画
        $rootScope.stateIsLoading = true;
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.stateIsLoading = false;
    });
});