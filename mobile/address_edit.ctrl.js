var app = angular.module('mobile');

app.controller('AddressEdit', function ($scope, AddressSvc) {
    document.title = '我的收货地址';

    AddressSvc.originList(AddressLevel.Province, 0).then(function (list) {
        $scope.provinces = list;
        $scope.PID = $scope.CID = '0';
    });

    $scope.fillCities = function (ID, isRoot) {
        var addrLv = isRoot ? AddressLevel.City : AddressLevel.District;
        AddressSvc.originList(addrLv, ID).then(function (list) {
            if (isRoot) {
                $scope.cities = list;
                $scope.CID = '0';
                $scope.districts = [];
            } else {
                $scope.districts = list;
            }
        });
    }
});