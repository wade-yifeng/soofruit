// 个人中心控制器
var IndexController = function($scope, $http, $timeout) {
    $http.get('/index').success(function (result) {
        if(!result.success || !result.data) {
            //showInfo(result.msg);
        }
        
        $scope.subjects = result.data.subjects;
        $scope.spotlights = result.data.spotlights;
        $scope.express = result.data.express;
    }).error(function () {
        // showInfo('加载首页数据失败，可以尝试联系我们的客服MM');
    });

    $scope.$on('$viewContentLoaded', function(event){
        if($scope.subjects) {
            //初始化轮播插件
            var swiper = new Swiper('.swiper-container', {
                autoplay: 6000,//可选选项，自动滑动
                pagination: '.swiper-pagination',
                lazyLoading: true,
                autoplayDisableOnInteraction: false
            });
        }
    });
};

IndexController.$inject = ['$scope', '$http', '$timeout'];