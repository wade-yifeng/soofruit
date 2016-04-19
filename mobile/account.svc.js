var app = angular.module('mobile');

app.factory('AccountSvc', function ($http, $q) {
    return {
        getUser: function () {
            var defer = $q.defer();
            $http.get('/account').success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        }
    };
});