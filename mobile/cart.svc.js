var app = angular.module('mobile');

app.factory('CartSvc', function ($http, $q, ShareSvc) {
    return {
        create: function (good) {
            var defer = $q.defer();
            $http.post('/cart', {
                userID: ShareSvc.UserID,
                goods: [{
                    goodID: good._id,
                    name: good.name,
                    sellPrice: good.sellPrice,
                    pic: good.pics[0],
                    quantity: 1
                }]
            }).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        },
        get: function () {
            var defer = $q.defer();
            $http.get('/cart/' + ShareSvc.UserID).success(function (result) {
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
        addToCart: function (good) {
            this.getCartSession().then(function (cart) {
                cart.goods.push({
                    goodID: good._id,
                    name: good.name,
                    sellPrice: good.sellPrice,
                    pic: good.pics[0],
                    quantity: 1
                });
                return this.setCartSession(cart);
            }, function () {
                return this.setCartSession({
                    userID: ShareSvc.UserID,
                    goods: [{
                        goodID: good._id,
                        name: good.name,
                        sellPrice: good.sellPrice,
                        pic: good.pics[0],
                        quantity: 1
                    }]
                });
            });
        },
        setCartSession: function (cart) {
            var defer = $q.defer();
            $http.post('/cartSession', cart).success(function (result) {
                httpSuccess(result, defer);
            });
            return defer.promise;
        },
        getCartSession: function () {
            var defer = $q.defer();
            $http.get('/cartSession/' + ShareSvc.UserID).success(function (result) {
                httpSuccess(result, defer, true);
            });
            return defer.promise;
        }
    }
});