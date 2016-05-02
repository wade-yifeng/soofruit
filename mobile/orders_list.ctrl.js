var app = angular.module('mobile');

app.controller('Orders', function ($scope, OrderSvc, $stateParams) {
    activateNav($stateParams.listType);

    OrderSvc.listPaged($stateParams.listType, 1).then(function (orders) {
        $scope.orders = orders.data;
    });

    $scope.getStatusName = function (status) {
        return getOrderStatusInfo(status).shortName;
    };
});