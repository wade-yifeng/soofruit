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
            var self = this;
            var defer = $q.defer();
            this.getCartSession().then(function (cart) {
                var idArr = getIdArrOfGoods(cart.goods);
                var indexInArr = idArr.indexOf(good._id);
                if (indexInArr > -1) {
                    cart.goods[indexInArr].quantity += 1;
                }
                else {
                    cart.goods.push({
                        goodID: good._id,
                        name: good.name,
                        sellPrice: good.sellPrice,
                        pic: good.pics[0],
                        quantity: 1
                    });
                }
                self.setCartSession(cart).then(function () {
                    defer.resolve();
                });
            }, function () {
                self.setCartSession({
                    userID: ShareSvc.UserID,
                    goods: [{
                        goodID: good._id,
                        name: good.name,
                        sellPrice: good.sellPrice,
                        pic: good.pics[0],
                        quantity: 1
                    }]
                }).then(function () {
                    defer.resolve();
                });
            });
            return defer.promise;
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