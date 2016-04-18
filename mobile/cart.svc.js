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
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            },
            get: function (userID) {
                var defer = $q.defer();
                $http.get('/cart/' + userID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            },
            update: function (cart) {
                var defer = $q.defer();
                $http.put('/cart/' + cart.userID, cart).success(function (result) {
                    httpSuccess(result, defer);
                });
                return defer.promise;
            },
            setCartSession: function (cart) {
                var defer = $q.defer();
                $http.post('/cartSession/' + cart.userID, cart).success(function (result) {
                    httpSuccess(result, defer);
                });
                return defer.promise;
            },
            getCartSession: function (cart) {
                var defer = $q.defer();
                $http.get('/cartSession/' + cart.userID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            }
        }
    }
);