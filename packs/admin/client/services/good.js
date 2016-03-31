/**
 * Created by xz_liu on 2016/3/30.
 */
var app = angular.module('mobile');

app.factory('GoodSvc', function ($http, $q) {
        return {
            create: function (good) {
                var defer = $q.defer();
                $http.post('/goods', good).success(function (result) {
                    if (!result.code) {
                        defer.resolve(result);
                    }
                    else {
                        defer.reject();
                    }
                });
                return defer.promise;
            },
            get: function (goodID) {
                var defer = $q.defer();
                $http.get('/goods/' + goodID).success(function (result) {
                    if (result != null && !result.code) {
                        defer.resolve(result);
                    }
                    else {
                        defer.reject();
                    }
                });
                return defer.promise;
            },
            update: function (good) {
                var defer = $q.defer();
                $http.put('/goods/' + good._id, good).success(function (result) {
                    if (result.code == 0) {
                        defer.resolve(result);
                    }
                    else {
                        defer.reject();
                    }
                });
                return defer.promise;
            },
            delete: function (goodID) {
                var defer = $q.defer();
                $http.delete('/goods/' + goodID).success(function (result) {
                    if (result.code == 0) {
                        defer.resolve(result);
                    }
                    else {
                        defer.reject();
                    }
                });
                return defer.promise;
            }
        }
    }
);