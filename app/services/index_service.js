var IndexService = function ($http, Promise, HttpGet) {
    return {
        LoadSubjectsAndExpress: function (pageIndex) {
            return Promise(function (defer) {
                HttpGet('index', defer);
            });
        }
    };
};