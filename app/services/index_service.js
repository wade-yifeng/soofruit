var IndexService = function ($http, Promise, HttpGet) {
    return {
        LoadSubjectsAndExpress: function () {
            return Promise(function (defer) {
                HttpGet('getActivities', null, defer);
            });
        },
        LoadPagedProducts: function(pageIndex) {
            return Promise(function (defer) {
                HttpGet('getProductList', {page_index: pageIndex}, defer);
            });
        }
    };
};

IndexService.$inject = ['$http', 'Promise', 'HttpGet'];