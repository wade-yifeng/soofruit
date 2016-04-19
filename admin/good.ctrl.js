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
                name: '【限量250份】1元1个泰国进口榴莲（3-4斤）再慢就被别人抢完啦！【水果之王 肉质细腻 入口绵密】',
                desc: '榴莲美味拿回家！S号榴莲一个3-4斤，口感独特，榴莲香气浓郁，果肉厚实饱满，清凉甜蜜，酥软味甜，新鲜绵滑，还具有很高的营养价值哦【榴莲水份丢失率较高，大约有正负100g浮动，亲们这是正常的哦】【新鲜的榴莲您收到时可能还没熟，在温度为15℃以上的地方放1-2天，比如暖气片、小太阳旁边，很快就会熟哦！】抽奖规则 活动时间: 4月17日18:00-4月24日18:00 1、活动结束后从组团成功的订单中随机抽取250份。2、组团成功未抽中者退款+安慰代金券88元！3、中奖的商品预计4.27号发放。',
                tags: ['泰国进口榴莲', '新鲜空运 质地饱满', '活血散寒 健脾补气'],
                pics: [],
                ensures: ['包邮', '正品保障', '48小时发货'],
                spec: '500g',
                provenance: '上海',
                shelfLife: 1,
                storage: '阴凉',
                originPrice: 99,
                sellPrice: 58,
                sales: 100,
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