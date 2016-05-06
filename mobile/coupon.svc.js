var app = angular.module('mobile');

app.factory('CouponSvc', function ($http, $q) {
        return {
            list: function () {
                var defer = $q.defer();
                $http.get('/coupons').success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            },
            listPointsExchange: function () {
                var defer = $q.defer();
                $http.get('/coupons?type=' + CouponType.PointsExchange).success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            },
            create: function (coupon) {
                var defer = $q.defer();
                $http.post('/coupons', coupon).success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            },
            get: function (couponID) {
                var defer = $q.defer();
                $http.get('/coupons/' + couponID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
                return defer.promise;
            },
            update: function (coupon) {
                var defer = $q.defer();
                $http.put('/coupons/' + coupon._id, coupon).success(function (result) {
                    httpSuccess(result, defer);
                });
                return defer.promise;
            },
            delete: function (couponID) {
                var defer = $q.defer();
                $http.delete('/coupons/' + couponID).success(function (result) {
                    httpSuccess(result, defer);
                });
                return defer.promise;
            }
        }
    }
);