var app = angular.module('mobile');

app.controller('Orders', function ($scope, ShareSvc, OrderSvc, $stateParams) {
    activateNav($stateParams.listType);

    ShareSvc.user().then(function (user) {
        OrderSvc.listPaged(user._id, $stateParams.listType, 1).then(function (orders) {
            $scope.orders = orders.data;
        });
    });

    $scope.getStatusName = function (status) {
        return getOrderStatusInfo(status).shortName;
    };
});