// 个人中心控制器
var IndexController = function($scope, $http, $timeout, Index) {
    Index.LoadSubjectsAndExpress().then(function (result) {
        if(!result.success || !result.data) {
            //showInfo(result.msg);
        }
        
        $scope.subjects = result.data.subjects;
        $scope.spotlights = result.data.spotlights;
        $scope.express = result.data.express;

        $timeout(function() {
            //初始化轮播插件
            var swiper = new Swiper('.swiper-container', {
                autoplay: 6000,//可选选项，自动滑动
                pagination: '.swiper-pagination',
                lazyLoading: true,
                autoplayDisableOnInteraction: false
            });
        }, 0);
    });
};

IndexController.$inject = ['$scope', '$http', '$timeout', 'Index'];