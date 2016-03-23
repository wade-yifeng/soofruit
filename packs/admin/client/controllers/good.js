/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('admin');

app.controller('Good', function ($scope, $http, $route, Upload, $timeout) {
    document.title = 'Goods Management';
    $scope.isUpdate = false;
    $scope.buttonName = '新建商品';

    //测试用数据
    $scope.good = {
        name: '芒果',
        desc: '描述',
        category: 'Nut',
        pics: [],
        provenance: '上海',
        shelfLife: 1,
        storage: '阴凉',
        price: 10,
        sales: 0,
        balance: 120
    };

    $http.get('/goods').success(function (result) {
        $scope.goods = result;
    });

    $http.get('/goodCategories').success(function (result) {
        $scope.goodCategories = result;
    });

    $scope.editGood = function (_id) {
        $http.get('/goods/' + _id).success(function (result) {
            if (!result.code) {
                $scope.good = result;
                $scope.isUpdate = true;
                $scope.buttonName = '编辑商品';
            }
        });
    };

    $scope.saveGood = function (good) {
        if (!$scope.isUpdate) {
            $http.post('/goods', good).success(function (result) {
                if (!result.code) {
                    $route.reload();
                }
            });
        }
        else {
            $http.put('/goods/' + good._id, good).success(function (result) {
                if (result.code == 0) {
                    $route.reload();
                }
            });
        }
    };

    $scope.deleteGood = function (_id) {
        $http.delete('/goods/' + _id).success(function (result) {
            if (result.code == 0) {
                $route.reload();
            }
        });
    };

    $scope.uploadFiles = function (files) {
        $scope.files = files;
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: '/pics',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    $scope.good.pics.push(response.data);
                    console.log();
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        });
    }
});