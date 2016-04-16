var app = angular.module('admin');

app.controller('Dic', function ($scope, DicSvc, $state) {
    document.title = 'Dictionary Management';

    var toggleCreateUpdate = function (isUpdate) {
        $scope.isUpdate = isUpdate;
        if (!isUpdate) {
            $scope.dicEdit = {};
        }
    };

    //页面初始化
    toggleCreateUpdate(false);
    DicSvc.list().then(function (result) {
        $scope.dics = result;
    });
    DicSvc.getDicsOfType('DicType').then(function (result) {
        $scope.dicTypes = result;
    });

    $scope.editDic = function (dicID) {
        toggleCreateUpdate(true);
        DicSvc.get(dicID).then(function (result) {
            $scope.dicEdit = result;
        });
    };

    $scope.cancelEdit = function () {
        toggleCreateUpdate(false);
    };

    $scope.saveDic = function (dic) {
        if (!$scope.isUpdate)
            DicSvc.create(dic).then(function () {
                showInfo('字典项创建成功');
                $state.reload();
            });
        else
            DicSvc.update(dic).then(function () {
                showInfo('字典项编辑成功');
                $state.reload();
            });
    };

    $scope.deleteDic = function (dicID) {
        showConfirm('确定要删除字典项吗?');
        $scope.entityToOperate = dicID;
    };

    $scope.confirmOperation = function (dicID) {
        DicSvc.delete(dicID).then(function () {
            showInfo('字典项删除成功');
            $state.reload();
        });
    };
});