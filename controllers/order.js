/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('app');

app.controller('OrderCtrl', function ($scope, $http) {
    $scope.order = {
        customer: 'leo',
        amount: 0,
        delivery_date: new Date()
    };

    $scope.createOrder = function (order) {
        $http.post('/orders', order, function (data) {
            alert(data);
        })
    };
});