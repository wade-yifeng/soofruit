var app = angular.module('mobile');

app.controller('AddressEdit', function ($scope, AddressSvc, ShareSvc, $state) {
    document.title = '我的收货地址';
    $scope.address = {userID: ShareSvc.UserID};
    var emptyCities = [{Val: '- 选择市 -'}];
    var emptyDistricts = [{Val: '- 选择区/县 -'}];

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
        AddressSvc.delete($scope.address._id).then(redirect);
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