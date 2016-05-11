var app = angular.module('mobile');

app.controller('AddressSelect', function ($scope, AddressSvc, $state) {
    document.title = '我的收货地址';

    AddressSvc.list().then(function (list) {
        $scope.addresses = list;
    });

    $scope.select = function (address) {
        $scope.updateSelectedAddress(address);
        hideAddressDialog();
    };

    $scope.openEdit = function (addressID) {
        hideAddressDialog();
        setTimeout(function () {
            if (addressID) {
                $state.go('checkout.addressEdit', {addressID: addressID});
            } else {
                $state.go('checkout.addressEdit');
            }
            showAddressDialog();
        }, 500);
    };

    $scope.setDefault = function (address) {
        $scope.addresses.forEach(function (addr) {
            if (addr.isDefault) {
                addr.isDefault = false;
                AddressSvc.update(addr).then(function () {
                    address.isDefault = true;
                    AddressSvc.update(address).then(showInfo);
                });
            }
        });
    };
});