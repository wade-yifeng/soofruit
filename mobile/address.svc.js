var app = angular.module('mobile');

app.factory('AddressSvc', function ($http, $q, ShareSvc) {
    return {
        originList: function (addrLv, id) {
            var defer = $q.defer();
            $http.get('/addressOrigin/' + addrLv + '/' + id).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        },
        list: function () {
            var defer = $q.defer();
            $http.get('/addresses/' + ShareSvc.UserID).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        },
        create: function (address) {
            var defer = $q.defer();
            $http.post('/address', address).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        },
        get: function (addressID) {
            var defer = $q.defer();
            $http.get('/address/' + addressID).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        },
        update: function (address) {
            var defer = $q.defer();
            $http.put('/address/' + address._id, address).success(function (result) {
                httpSuccess(result, defer);
            });
            return defer.promise;
        },
        delete: function (addressID) {
            var defer = $q.defer();
            $http.delete('/address/' + addressID).success(function (result) {
                httpSuccess(result, defer);
            });
            return defer.promise;
        }
    }
});