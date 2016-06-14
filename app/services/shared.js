var PromiseService = function ($q) {
    return function (logic) {
        var defer = $q.defer();
        logic(defer);
        return defer.promise;
    };
};

var HttpGetService = function ($http) {
    return function (url, defer) {
        $http.get(url).success(function(result) {
            defer.resolve(result);
        }).error(function(result, status) {
            defer.reject(status);
        });
    };
};