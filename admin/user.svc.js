var app = angular.module('admin');

app.factory('UserSvc', function ($http, $q) {
        return {
            listPaged: function (page) {
                var defer = $q.defer();
                $http.get('/users?page=' + page).success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            }
        }
    }
);