var app = angular.module('mobile');

app.controller('AddressSelect', function ($scope, AddressSvc) {
    document.title = '我的收货地址';

    AddressSvc.list().then(function (list) {
        $scope.addresses = list;
    });
});