var app = angular.module('mobile');

app.filter('html', function ($sce) {
    return function (text) {
        //return $sce.parseAsHtml(text);
    };
});