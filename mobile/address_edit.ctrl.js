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
        ShareSvc.user().then(function (user) {
            $scope.address = {userID: user._id};

            AddressSvc.originList(AddressLevel.Province, 0).then(function (list) {
                initProvinces(list);
                initCities(emptyCities);
                initDistricts(emptyDistricts);
            });
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
            ShareSvc.user().then(function (user) {
                $scope.address.userID = user._id;
                if ($scope.$parent.firstAddress) {
                    $scope.address.isDefault = true;
                }
                AddressSvc.create($scope.address).then(function (newID) {
                    var info = '收货地址创建成功';
                    if ($scope.$parent.firstAddress) {
                        $scope.address._id = newID;
                        showInfo(info);
                        hideAddressDialog();
                        $scope.updateSelectedAddress($scope.address);
                        $scope.updateFirstAddressFlag(false);
                    }
                    else {
                        $scope.redirect(info);
                    }
                });
            });
        } else {
            AddressSvc.update($scope.address).then($scope.redirect);
        }
    };

    $scope.delete = function () {
        showConfirm('确定要删除这个地址吗?');
    };

    $scope.confirmOperation = function () {
        var deletedWasDefault = $scope.address.isDefault;
        var deletedWasSelected = $scope.getSelectedAddress()._id == $scope.address._id;

        AddressSvc.delete($scope.address._id)
            .then(function (info) {
                showInfo(info);
                $scope.address = null;
                return AddressSvc.list();
            })
            .then(function (list) {
                return ShareSvc.promise(function (defer) {
                    if (list.length > 0) {
                        if (deletedWasSelected) {
                            var newSelected = list[0];
                            if (deletedWasDefault) {
                                newSelected.isDefault = true;
                                AddressSvc.update(newSelected).then(function () {
                                    defer.resolve(newSelected);
                                });
                            }
                            else {
                                defer.resolve(newSelected);
                            }
                        } else {
                            defer.resolve();
                        }
                    }
                    else {
                        defer.reject();
                        showInfo('请先添加一个收货地址');
                        $scope.updateFirstAddressFlag(true);
                        $scope.updateSelectedAddress({});
                        $scope.redirect(null, true);
                    }
                });
            })
            .then(function (newSelected) {
                if (newSelected) {
                    $scope.updateSelectedAddress(newSelected);
                }
                $scope.redirect();
            });
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
})
;