var app = angular.module('admin');

app.controller('Coupon', function ($scope, CouponSvc, $state) {
    document.title = 'Coupon Management';
    $scope.couponEdit = {type: '- 请选择 -'};
    $scope.type = $scope.couponEdit.type;

    $scope.couponTypes = Object.getOwnPropertyNames(CouponType);
    Array.prototype.unshift.call($scope.couponTypes, '- 请选择 -');
    toggleCreateUpdate(false);
    CouponSvc.list().then(function (result) {
        $scope.coupons = result;
    });

    $scope.typeChange = function (newType) {
        $scope.couponEdit.type = newType;
        if (newType == CouponType.NewUser) $scope.couponEdit.minPoints = null;
        $scope.disableMinPoints = newType == CouponType.NewUser ? true : false;
    };

    $scope.editCoupon = function (couponID) {
        toggleCreateUpdate(true);
        CouponSvc.get(couponID).then(function (result) {
            $scope.couponEdit = result;
            $scope.type = $scope.couponEdit.type;
        });
    };

    $scope.cancelEdit = function () {
        toggleCreateUpdate(false);
    };

    $scope.saveCoupon = function (coupon) {
        if (!$scope.isUpdate)
            CouponSvc.create(coupon).then(function () {
                showInfo('优惠券创建成功');
                $state.reload();
            });
        else
            CouponSvc.update(coupon).then(function () {
                showInfo('优惠券编辑成功');
                $state.reload();
            });
    };

    $scope.deleteCoupon = function (couponID) {
        showConfirm('确定要删除优惠券吗?');
        $scope.entityToOperate = couponID;
    };

    $scope.confirmOperation = function (couponID) {
        CouponSvc.delete(couponID).then(function () {
            showInfo('优惠券删除成功');
            $state.reload();
        });
    };

    function toggleCreateUpdate(isUpdate) {
        $scope.isUpdate = isUpdate;
        if (!isUpdate) {
            $scope.couponEdit = {};
        }
    }
});