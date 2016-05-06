var app = angular.module('mobile');

app.controller('Coupon', function ($scope, ShareSvc, UserCouponSvc, CouponSvc, $stateParams) {
    document.title = '我的优惠券';
    initCouponNav($stateParams.status);

    ShareSvc.user().then(function (user) {
        UserCouponSvc.listPaged(user._id, $stateParams.status, 1).then(function (userCoupons) {
            $scope.userCoupons = userCoupons.data;
        });

        CouponSvc.list().then(function (coupons) {
            $scope.coupons = coupons;
        });

        UserCouponSvc.listPaged(user._id, CouponStatus.Pending, 1).then(function (userCoupons) {
            $scope.pendingTotal = userCoupons.pages.total;
        });

        UserCouponSvc.listPaged(user._id, CouponStatus.Unusable, 1).then(function (userCoupons) {
            $scope.unusableTotal = userCoupons.pages.total;
        });
    });

    $scope.getAmount = function (couponID) {
        var result = 0;
        $scope.coupons.forEach(function (item) {
            if (item._id == couponID) result = item.amount;
        });
        return result;
    };

    $scope.getMinPoints = function (couponID) {
        var result = 0;
        $scope.coupons.forEach(function (item) {
            if (item._id == couponID) result = item.minPoints;
        });
        return result;
    };
});