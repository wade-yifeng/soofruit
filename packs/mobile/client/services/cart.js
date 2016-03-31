/**
 * Created by xz_liu on 2016/3/30.
 */
var app = angular.module('mobile');

app.factory('CartSvc', function ($http, $q) {
        return {
            create: function (userID, good) {
                var defer = $q.defer();
                $http.post('/cart', {
                    userID: userID,
                    goods: [{
                        goodID: good._id,
                        name: good.name,
                        price: good.price,
                        pic: good.pics[0],
                        quantity: 1
                    }]
                }).success(function (result) {
                    if (!result.code) {
                        defer.resolve(result);
                    }
                    else {
                        defer.reject();
                    }
                });
                return defer.promise;
            },
            get: function (userID) {
                var defer = $q.defer();
                $http.get('/cart/' + userID).success(function (result) {
                    if (result == null || !result.code) {
                        defer.resolve(result);
                    }
                    else {
                        defer.reject();
                    }
                });
                return defer.promise;
            },
            update: function (cart) {
                var defer = $q.defer();
                $http.put('/cart/' + cart.userID, cart).success(function (result) {
                    if (result.code == 0) {
                        defer.resolve();
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