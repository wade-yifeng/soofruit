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
            var swiperSubjects = new Swiper('#subjects', {
                autoplay: 6000,//可选选项，自动滑动
                pagination: '#subjects .swiper-pagination',
                lazyLoading: true,
                loop: true,
                autoplayDisableOnInteraction: false
            });

            //设置首页轮播图片高度
            var window_w = $(window).width();
            if (window_w < 540) {
                height_slider = window_w * 1 / 2;
                $('#subjects a img').css('height', height_slider);
            }

            //初始化滚动栏
            var swiperSpotlights = new Swiper('#spotlights', {
                scrollbar: '#spotlights .swiper-scrollbar',
                scrollbarHide: true,
                slidesPerView: 'auto',
                spaceBetween: 0,
                grabCursor: true
            });
            
            //新品推荐闪现
            $("#express li").addClass("rotateY");
        }, 0);
    });

    // 商品列表尚未加载
    $scope.loading = false;

    $scope.LoadPagedData = function(pageIndex, callback) {
        Index.LoadPagedProducts(pageIndex).then(function(result) {
            if(!result.success || !result.data) {
                //showInfo(result.msg);
            }
            $scope.totalPage = result.data.totalPage;
            $scope.products = result.data.products;
            $timeout(function() {
                callback();
            });
        });
    };
};

IndexController.$inject = ['$scope', '$http', '$timeout', 'Index'];