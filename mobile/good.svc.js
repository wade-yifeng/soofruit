var app = angular.module('mobile');

app.factory('GoodSvc', function ($http, $q) {
    return {
        listPaged: function (page) {
            var defer = $q.defer();
            $http.get('/goodsPaged?page=' + page).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        },
        create: function (good) {
            var defer = $q.defer();
            $http.post('/goods', good).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        },
        get: function (goodID) {
            var defer = $q.defer();
            $http.get('/goods/' + goodID).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        },
        update: function (good) {
            var defer = $q.defer();
            $http.put('/goods/' + good._id, good).success(function (result) {
                httpSuccess(result, defer);
            });
            return defer.promise;
        },
        delete: function (goodID) {
            var defer = $q.defer();
            $http.delete('/goods/' + goodID).success(function (result) {
                httpSuccess(result, defer);
            });
            return defer.promise;
        }
    }
});