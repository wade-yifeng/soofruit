var app = angular.module('mobile');

app.factory('OrderSvc', function ($http, ShareSvc) {
    return {
        listPaged: function (userID, listType, page) {
            return ShareSvc.promise(function (defer) {
                $http.get('/ordersPaged?userID=' + userID + '&listType=' + listType + '&page=' + page).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        create: function (order) {
            return ShareSvc.promise(function (defer) {
                $http.post('/orders', order).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        get: function (orderID) {
            return ShareSvc.promise(function (defer) {
                $http.get('/orders/' + orderID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        update: function (order) {
            return ShareSvc.promise(function (defer) {
                $http.put('/orders/' + order._id, order).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        },
        delete: function (orderID) {
            return ShareSvc.promise(function (defer) {
                $http.delete('/orders/' + orderID).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        }
    }
});