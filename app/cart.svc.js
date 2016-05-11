var app = angular.module('mobile');

app.factory('CartSvc', function ($http, ShareSvc) {
    return {
        create: function (good) {
            return ShareSvc.promise(function (defer) {
                ShareSvc.user().then(function (user) {
                    $http.post('/cart', {
                        userID: user._id,
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
                });
            });
        },
        get: function () {
            return ShareSvc.promise(function (defer) {
                ShareSvc.user().then(function (user) {
                    $http.get('/cart/' + user._id).success(function (result) {
                        httpSuccess(result, defer, true);
                    });
                });
            });
        },
        update: function (cart) {
            return ShareSvc.promise(function (defer) {
                $http.put('/cart/' + cart.userID, cart).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        },
        addToCart: function (good) {
            var self = this;
            return ShareSvc.promise(function (defer) {
                self.getCartSession().then(function (cart) {
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
                    ShareSvc.user().then(function (user) {
                        self.setCartSession({
                            userID: user._id,
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
                });
            });
        },
        setCartSession: function (cart) {
            return ShareSvc.promise(function (defer) {
                $http.post('/cartSession', cart).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        },
        getCartSession: function () {
            return ShareSvc.promise(function (defer) {
                $http.get('/cartSession').success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        }
    }
});