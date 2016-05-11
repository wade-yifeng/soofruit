var app = angular.module('mobile');

app.controller('Coupon', function ($scope, ShareSvc, UserCouponSvc, CouponSvc, $stateParams) {
    document.title = '我的优惠券';
    initCouponNav($stateParams.status);

    ShareSvc.user().then(function (user) {
        UserCouponSvc.listPaged(user._id, $stateParams.status, 1).then(function (userCoupons) {
            $scope.userCoupons = userCoupons.data;
        });

        UserCouponSvc.listPaged(user._id, CouponStatus.Pending, 1).then(function (userCoupons) {
            $scope.pendingTotal = userCoupons.pages.total;
        });

        UserCouponSvc.listPaged(user._id, CouponStatus.Unusable, 1).then(function (userCoupons) {
            $scope.unusableTotal = userCoupons.pages.total;
        });
    });
});