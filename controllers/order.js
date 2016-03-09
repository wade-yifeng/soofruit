/**
 * Created by xz_liu on 2016/3/9.
 */
var controllers = angular.module('orderController', []);

controllers.controller('OrderCtrl', function ($scope) {
    $scope.customer = 'leo';
    $scope.amount = 0;
    $scope.delivery_date = Date.now;
});