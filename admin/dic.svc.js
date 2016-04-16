var app = angular.module('admin');

app.factory('DicSvc', function ($http, $q) {
        return {
            list: function () {
                var defer = $q.defer();
                $http.get('/dics').success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            },
            create: function (dic) {
                var defer = $q.defer();
                $http.post('/dics', dic).success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            },
            get: function (dicID) {
                var defer = $q.defer();
                $http.get('/dics/' + dicID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            },
            update: function (dic) {
                var defer = $q.defer();
                $http.put('/dics/' + dic._id, dic).success(function (result) {
                    httpSuccess(result, defer);
                });
                return defer.promise;
            },
            delete: function (dicID) {
                var defer = $q.defer();
                $http.delete('/dics/' + dicID).success(function (result) {
                    httpSuccess(result, defer);
                });
                return defer.promise;
            },
            getDicsOfType: function (dicType) {
                var defer = $q.defer();
                $http.get('/dicsOfType/' + dicType).success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            }
        }
    }
);