var app = angular.module('mobile');

app.factory('GoodSvc', function ($http, ShareSvc) {
    return {
        listPaged: function (page) {
            return ShareSvc.promise(function (defer) {
                $http.get('/goodsPaged?page=' + page).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        create: function (good) {
            return ShareSvc.promise(function (defer) {
                $http.post('/goods', good).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        get: function (goodID) {
            return ShareSvc.promise(function (defer) {
                $http.get('/goods/' + goodID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        update: function (good) {
            return ShareSvc.promise(function (defer) {
                $http.put('/goods/' + good._id, good).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        },
        delete: function (goodID) {
            return ShareSvc.promise(function (defer) {
                $http.delete('/goods/' + goodID).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        }
    }
});