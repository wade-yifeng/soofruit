var app = angular.module('mobile');

app.factory('CheckoutSvc', function ($http, $q) {
    return {
        get: function () {
            var defer = $q.defer();
            $http.get('/cart/' + ShareSvc.UserID).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        }
    }
});