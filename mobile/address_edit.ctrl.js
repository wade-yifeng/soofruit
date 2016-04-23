var app = angular.module('mobile');

app.controller('AddressEdit', function ($scope, AddressSvc, ShareSvc, $state, $stateParams) {
    document.title = '我的收货地址';
    var emptyCities = [{Val: '- 选择市 -'}];
    var emptyDistricts = [{Val: '- 选择区/县 -'}];

    if ($stateParams.addressID) {
        //获取地址
        AddressSvc.get($stateParams.addressID).then(function (result) {
                $scope.address = result;
            })
            //获取列表并选中省
            .then(function () {
                return ShareSvc.promise(function (defer) {
                    AddressSvc.originList(AddressLevel.Province, 0).then(function (list) {
                        list.forEach(function (pro, index) {
                            if (pro.Val == $scope.address.province) {
                                defer.resolve(pro.PID);
                                initProvinces(list, index);
                            }
                        });
                    });
                });
            })
            //获取列表并选中市
            .then(function (PID) {
                return ShareSvc.promise(function (defer) {
                    AddressSvc.originList(AddressLevel.City, PID).then(function (list) {
                        list.forEach(function (city, index) {
                            if (city.Val == $scope.address.city) {
                                defer.resolve(city.CID);
                                initCities(list, index);
                            }
                        });
                    });
                });
            })
            //获取列表并选中区
            .then(function (CID) {
                AddressSvc.originList(AddressLevel.District, CID).then(function (list) {
                    list.forEach(function (dis, index) {
                        if (dis.Val == $scope.address.district) {
                            initDistricts(list, index);
                        }
                    });
                });
            });
    } else {
        $scope.address = {userID: ShareSvc.UserID};

        AddressSvc.originList(AddressLevel.Province, 0).then(function (list) {
            initProvinces(list);
            initCities(emptyCities);
            initDistricts(emptyDistricts);
        });
    }

    $scope.fillChildList = function (entity) {
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
            if ($scope.$parent.firstAddress) {
                $scope.address.isDefault = true;
            }
            AddressSvc.create($scope.address).then(function (info) {
                if ($scope.$parent.firstAddress) {
                    showInfo(info);
                    hideAddressDialog();
                    $scope.selectAddress($scope.address);
                }
                else {
                    redirect(info);
                }
            });
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

    var initProvinces = function (list, index) {
        $scope.provinces = list;
        $scope.province = $scope.provinces[index || 0];
    };

    var initCities = function (list, index) {
        $scope.cities = list;
        $scope.city = $scope.cities[index || 0];
    };

    var initDistricts = function (list, index) {
        $scope.districts = list;
        $scope.district = $scope.districts[index || 0];
    };

    var redirect = function (info) {
        showInfo(info);
        hideAddressDialog();
        $state.go('checkout.addressSelect');
        // 多点几次会出bug,需要加载两次state
        setTimeout(function () {
            $state.go('checkout.addressSelect');
            showAddressDialog();
        }, 300);
    }
});