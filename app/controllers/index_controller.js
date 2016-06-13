// 个人中心控制器
var IndexController = function($scope, $http) {
    $http.get('/index').success(function (result) {
        if(!result.success || !result.data) {
            //showInfo(result.msg);
        }
        
        $scope.slides = result.data.slides;
        $scope.subjects = result.data.subjects;
        $scope.spotlights = result.data.spotlights;

        //初始化轮播插件
        var swiper = new Swiper('.swiper-container', {
            autoplay: 6000,//可选选项，自动滑动
            pagination: '.swiper-pagination',
            lazyLoading: true,
            autoplayDisableOnInteraction: false
        });

    }).error(function () {
        // showInfo('加载首页数据失败，可以尝试联系我们的客服MM');
    });
};

IndexController.$inject = ['$scope', '$http'];