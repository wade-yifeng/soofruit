var app = angular.module('mobile');

app.controller('orderDetail', function ($scope, OrderSvc, AddressSvc, $stateParams) {
    document.title = '订单详情';

    OrderSvc.get($stateParams.orderID).then(function (order) {
        $scope.order = order;
        AddressSvc.get(order.addressID).then(function (address) {
            $scope.address = address;
        });
    });

    $scope.getStatusInfo = function (status) {
        return getOrderStatusInfo(status);
    };

    $scope.formatDatetime = function (datetime) {
        return formatDatetime(datetime, true);
    }
});