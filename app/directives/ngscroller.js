/**
 * 封装Scroller组件
 */
var ngScrollerDirective = function($templateCache) {
    return {
        transclude: true,
        template: $templateCache.get("ng_scroller.html"),
        link: function(scope, element, attrs) {
            scope.LoadPagedData(0, function() {
                attrs.$set('pageNo', 0);
                attrs.$set('totalPage', scope.totalPage);
            });

            element.parent('.infinite-scroll-bottom').on('infinite', function() {
                // 如果正在加载，则退出
                if (scope.loading) return;

                if (attrs.pageNo + 1 >= attrs.totalPage) {
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    // 删除加载提示符
                    $('.infinite-scroll-preloader').remove();
                    return;
                }

                // 设置flag
                scope.loading = true;
                // 模拟200ms的加载过程
                setTimeout(function() {
                    scope.LoadPagedData(attrs.pageNo + 1, function() {
                        attrs.$set('pageNo', attrs.pageNo + 1);
                        attrs.$set('totalPage', scope.totalPage);
                        // 重置加载flag
                        scope.loading = false;
                        $.refreshScroller();
                    });
                }, 200);
            });

            $.init();
        }
    };
};

ngScrollerDirective.$inject = ['$templateCache'];