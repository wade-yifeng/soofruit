var app = angular.module('mobile');

app.factory('AddressSvc', function ($http, ShareSvc) {
    return {
        originList: function (addrLv, id) {
            return ShareSvc.promise(function (defer) {
                $http.get('/addressOrigin/' + addrLv + '/' + id).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        list: function () {
            return ShareSvc.promise(function (defer) {
                $http.get('/addresses/' + ShareSvc.UserID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        create: function (address) {
            return ShareSvc.promise(function (defer) {
                $http.post('/address', address).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        get: function (addressID) {
            return ShareSvc.promise(function (defer) {
                $http.get('/address/' + addressID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        update: function (address) {
            return ShareSvc.promise(function (defer) {
                $http.put('/address/' + address._id, address).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        },
        delete: function (addressID) {
            return ShareSvc.promise(function (defer) {
                $http.delete('/address/' + addressID).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        }
    }
});