var app = angular.module('mobile');

app.factory('AddressSvc', function ($http, $q, ShareSvc) {
    return {
        originList: function (addrLv, id) {
            var defer = $q.defer();
            $http.get('/addressOrigin/' + addrLv + '/' + id).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        }
    }
});