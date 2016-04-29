var app = angular.module('mobile');

app.factory('ShareSvc', function ($q, AccountSvc) {
    return {
        promise: function (logic) {
            var defer = $q.defer();
            logic(defer);
            return defer.promise;
        },
        user: function () {
            return this.promise(function (defer) {
                if (window.user) {
                    console.log('get window user');
                    defer.resolve(window.user);
                } else {
                    console.log('init window user');
                    AccountSvc.getUserInfo().then(function (result) {
                        window.user = result;
                        defer.resolve(result);
                    }, defer.reject);
                }
            });
        }
    };
});