var app = angular.module('admin');

app.controller('Good', function ($scope, GoodSvc, DicSvc, Upload) {
    document.title = 'Goods Management';
    var emptyGood = {tags: ['', '', ''], pics: [], ensures: []};

    var commonGetPagedGoods = function (page) {
        GoodSvc.listPaged(page).then(function (result) {
            $scope.goods = [];
            $scope.goods.push.apply($scope.goods, result.data);
            $scope.pages = result.pages;
            $scope.pageArray = getPageArray(result.pages.current, result.pages.total);
            $scope.goodsTotal = result.items.total;
        });
    };

    var toggleCreateUpdate = function (isUpdate) {
        $('div.alert').hide();
        $scope.isUpdate = isUpdate;
        if (!isUpdate) {
            $scope.good = emptyGood;

            //测试用数据
            $scope.good = {
                name: '草莓',
                desc: '描述',
                tags: ['泰国进口榴莲', '新鲜空运 质地饱满', '活血散寒 健脾补气'],
                pics: [],
                ensures: ['包邮', '正品保障'],
                spec: '500g',
                provenance: '上海',
                shelfLife: 1,
                storage: '阴凉',
                originPrice: 99,
                sellPrice: 58,
                sales: 0,
                balance: 120
            };
        }
    };

    var initChosen = function (isToClear) {
        if (!$scope.ensuresList) {
            DicSvc.getDicsOfType('ensure').then(function (result) {
                $scope.ensuresList = result;
                $scope.ensuresList.forEach(function (item) {
                    item.selected = (!isToClear && ($scope.good.ensures.indexOf(item.name) > -1));
                });

                delay(function () {
                    $('.chosen').chosen().change(function (e, params) {
                        if (params.selected && $scope.good.ensures.indexOf(params.selected) == -1)
                            $scope.good.ensures.push(params.selected);
                        else if (params.deselected)
                            $scope.good.ensures.splice($scope.good.ensures.indexOf(params.deselected), 1);
                    });
                });
            });
        }
        else {
            $scope.ensuresList.forEach(function (item) {
                item.selected = (!isToClear && ($scope.good.ensures.indexOf(item.name) > -1));
            });
            delay(function () {
                $('.chosen').trigger("chosen:updated");
            });
        }
    };

    //页面初始化
    commonGetPagedGoods(1);
    toggleCreateUpdate(false);
    initChosen();

    $scope.getPagedGoods = function (page) {
        commonGetPagedGoods(page);
    };

    $scope.editGood = function (goodID) {
        GoodSvc.get(goodID).then(function (result) {
            $scope.good = result;
            toggleCreateUpdate(true);
            initChosen();
            editFormFlyIn();
        });
    };

    $scope.cancelEdit = function () {
        toggleCreateUpdate(false);
    };

    $scope.saveGood = function (good) {
        var res = window.ValidateGood(good);
        if (res.isValid()) {
            if (!$scope.isUpdate) {
                GoodSvc.create(good).then(function () {
                    showInfo('商品创建成功');
                    $('div.alert').hide();

                    //新建成功跳到新商品所在页
                    $scope.pages.current = Math.ceil(($scope.goodsTotal + 1) / $scope.pages.limit);
                    commonGetPagedGoods($scope.pages.current);
                    $scope.good = {
                        tags: ['', '', ''],
                        pics: [],
                        ensures: []
                    };
                });
            }
            else {
                GoodSvc.update(good).then(function () {
                    showInfo('商品更新成功');
                    commonGetPagedGoods($scope.pages.current);
                    toggleCreateUpdate(false);
                });
            }
            initChosen(true);
        }
        else {
            showValidationResult(res.msgs);
        }
    };

    $scope.deleteGood = function (goodID) {
        showConfirm('确定要删除商品吗?');
        $scope.entityToOperate = goodID;
    };

    $scope.confirmOperation = function (goodID) {
        GoodSvc.delete(goodID).then(function () {
            //删除当页最后一条后跳到前一页
            if ((($scope.goodsTotal - 1) % 10 == 0) && !$scope.pages.hasNext) {
                $scope.pages.current -= 1;
            }
            commonGetPagedGoods($scope.pages.current);
        });
    };

    $scope.uploadFiles = function (files) {
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: '/pics',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $scope.good.pics.push(response.data);
            }, function (response) {
                if (response.status > 0)
                    showInfo(response.status + ': ' + response.data);
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        });
    };

    $scope.deleteFile = function (file) {
        GoodSvc.deletePic(file).then(
            $scope.good.pics.splice($scope.good.pics.indexOf(file), 1)
        );
    };
});