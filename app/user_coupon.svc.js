var app = angular.module('mobile');

app.factory('UserCouponSvc', function ($http, ShareSvc) {
    return {
        listPaged: function (userID, status, page) {
            return ShareSvc.promise(function (defer) {
                $http.get('/userCouponsPaged?userID=' + userID + '&status=' + status + '&page=' + page).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        create: function (userCoupon) {
            return ShareSvc.promise(function (defer) {
                $http.post('/userCoupons', userCoupon).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        },
        get: function (userCouponID) {
            return ShareSvc.promise(function (defer) {
                $http.get('/userCoupons/' + userCouponID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        update: function (userCoupon) {
            return ShareSvc.promise(function (defer) {
                $http.put('/userCoupons/' + userCoupon._id, userCoupon).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        },
        delete: function (userCouponID) {
            return ShareSvc.promise(function (defer) {
                $http.delete('/userCoupons/' + userCouponID).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        }
    }
});