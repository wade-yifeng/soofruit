/**
 * 封装Scroller组件
 */
var ngScrollerDirective = function($templateCache) {
    return {
        transclude: true,
        templateUrl: $templateCache.get("ng_scroller.html"),
        link: function(scope, element, attr) {

        }
    };
};

ngScrollerDirective.$inject = ['$templateCache'];