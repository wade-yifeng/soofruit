var PromiseService = function ($q) {
    return function (logic) {
        var defer = $q.defer();
        logic(defer);
        return defer.promise;
    };
};

var HttpGetService = function ($http) {
    return function (url, data, defer) {
        $http({
            url: url,
            method: 'GET',
            params: data
        }).success(function(result) {
            defer.resolve(result);
        }).error(function(result, status) {
            defer.reject(status);
        });
    };
};

var HttpPostService = function ($http) {
    return function (url, data, defer) {
        $http({
            url: url,
            method: 'POST',
            data: data
        }).success(function(result) {
            defer.resolve(result);
        }).error(function(result, status) {
            defer.reject(status);
        });
    };
};

PromiseService.$inject = ['$q'];
HttpGetService.$inject = ['$http'];
HttpPostService.$inject = ['$http'];