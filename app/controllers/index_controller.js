// 个人中心控制器
var IndexController = function($scope, $http) {
    $http.get('/index').success(function (result) {
        if(!result.success) {
            showInfo(result.msg);
        }
        $scope.subjects = result.data.subjects;
        $scope.spotlights = result.data.spotlights;
    }).error(function () {
        showInfo('加载首页数据失败，可以尝试联系我们的客服MM');
    });
};

IndexController.$inject = ['$scope', '$http'];