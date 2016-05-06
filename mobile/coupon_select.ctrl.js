var app = angular.module('mobile');

app.controller('CouponSelect', function ($scope, ShareSvc, UserCouponSvc) {
    document.title = '我的优惠券';

    ShareSvc.user().then(function (user) {
        UserCouponSvc.listPaged(user._id, CouponStatus.Usable, 1).then(function (userCoupons) {
            $scope.userCoupons = userCoupons.data;
        });
    });
});