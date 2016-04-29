var app = angular.module('mobile');

app.factory('AccountSvc', function ($q, $http) {
    return {
        getUserInfo: function () {
            var defer = $q.defer();
            $http.get('/userSession').success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        }
    };
});