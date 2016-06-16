// 基础类库，部分基于jQuery
(function ($, window, undefined) {
    var Soofruit = window.Soofruit = window.Soofruit || {};
    Soofruit.App = Soofruit.App || {};

    Soofruit.App.activeFooterMenu = function(name) {
        var currentItem = $(".footer #" + name);
        
        if(currentItem) {
            currentItem.siblings().removeClass('active');
            currentItem.addClass('active');
        }
    };

    
}($, window, undefined));

// 扩展jQuery
(function($) {
    
})(jQuery);
