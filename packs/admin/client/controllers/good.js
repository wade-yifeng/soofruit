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
        name: '草莓',
        desc: '描述',
        category: 'Berry',
        pics: [],
        spec: '1kg',
        provenance: '上海',
        shelfLife: 1,
        storage: '阴凉',
        price: 10,
        sales: 0,
        balance: 120
    };

    $http.get('/goodCategories').success(function (result) {
        commonGetPagedGoods(1);
        $scope.goodCategories = result;
    });

    $scope.getPagedGoods = function (page) {
        commonGetPagedGoods(page);
    };

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
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        });
    };

    var commonGetPagedGoods = function (page) {
        $http.get('/goodsPaged?page=' + page).success(function (result) {
            $scope.goods = [];
            $scope.goods.push.apply($scope.goods, result.data);
            $scope.pages = result.pages;
            $scope.pageArray = getPageArray(result.pages.current, result.pages.total);
        });
    };

    var getPageArray = function (current, total) {
        var start = current > 5 ? current - 4 : 1;
        var end = total - current > 3 ? current + 4 : total;
        return _.range(start, end + 1);
    }
});