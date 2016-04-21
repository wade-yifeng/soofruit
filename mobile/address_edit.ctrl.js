var app = angular.module('mobile');

app.controller('AddressEdit', function ($scope, AddressSvc, ShareSvc, $state, $stateParams) {
    document.title = '我的收货地址';
    var emptyCities = [{Val: '- 选择市 -'}];
    var emptyDistricts = [{Val: '- 选择区/县 -'}];

    if ($stateParams.addressID) {
        AddressSvc.get($stateParams.addressID).then(function (result) {
            $scope.address = result;
        });
    } else {
        $scope.address = {userID: ShareSvc.UserID};
    }

    AddressSvc.originList(AddressLevel.Province, 0).then(function (list) {
        $scope.provinces = list;
        $scope.province = $scope.provinces[0];
        initCities(emptyCities);
        initDistricts(emptyDistricts);
    });

    $scope.fillChild = function (entity) {
        if (entity.PID != undefined || entity.CID != undefined) {
            var addrLv = entity.PID != undefined ? AddressLevel.City : AddressLevel.District;
            var id = entity.PID != undefined ? entity.PID : entity.CID;
            AddressSvc.originList(addrLv, id).then(function (list) {
                if (entity.PID != undefined) {
                    initCities(list);
                    initDistricts(emptyDistricts);
                } else {
                    initDistricts(list);
                }
            });
        }

        if (entity.PID != undefined) {
            $scope.address.province = entity.Val;
        } else if (entity.CID != undefined) {
            $scope.address.city = entity.Val;
        } else {
            $scope.address.district = entity.Val;
        }
    };

    $scope.save = function () {
        if (!$scope.address._id) {
            AddressSvc.create($scope.address).then(redirect);
        } else {
            AddressSvc.update($scope.address).then(redirect);
        }
    };

    $scope.delete = function () {
        showConfirm('确定要删除这个地址吗?');
    };

    $scope.confirmOperation = function () {
        AddressSvc.delete($scope.address._id).then(redirect);
    };

    $scope.displayDelete = function () {
        return $stateParams.addressID;
    };

    var initCities = function (list) {
        $scope.cities = list;
        $scope.city = $scope.cities[0];
    };

    var initDistricts = function (list) {
        $scope.districts = list;
        $scope.district = $scope.districts[0];
    };

    var redirect = function () {
        $state.go('addressSelect');
    }
});