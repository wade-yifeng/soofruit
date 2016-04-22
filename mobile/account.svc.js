var app = angular.module('mobile');

app.factory('AccountSvc', function ($http, ShareSvc) {
    return {
        getUser: function () {
            return ShareSvc.promise(function (defer) {
                $http.get('/account').success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        }
    };
});