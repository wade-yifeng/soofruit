var app = angular.module('mobile');

app.factory('AccountSvc', function ($http, ShareSvc) {
    return {
        getUserInfo: function () {
            return ShareSvc.promise(function (defer) {
                $http.get('/userSession').success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        }
    };
});