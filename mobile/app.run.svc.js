var app = angular.module('mobile');

app.run(function ($rootScope, $urlRouter, ShareSvc) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        //设置此标志位,用来在state加载完成之前显示加载动画
        $rootScope.stateIsLoading = true;

        //过滤出可直接跳转的url,判断是否登录,如没登录则登录后跳转回来
        //目前仅主页和不可跳转的url无需判断
        var paramIndex = toState.url.indexOf(':');
        if (toState.url.indexOf('/list/') == -1 && paramIndex != 0) {
            var url;
            if (paramIndex > 0) {
                var paramName = toState.url.substr(paramIndex + 1);
                url = toState.url.substr(0, paramIndex) + eval('toParams.' + paramName);
            }
            else if (paramIndex == -1) {
                url = toState.url;
            }
            if (url != '') {
                var targetUrl = '/account/' + encodeURIComponent('/#' + url);

                ShareSvc.user().then(null, function () {
                    location.href = targetUrl;
                });
            }
        }

        initUICommon(toState.name);
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.stateIsLoading = false;
    });
});