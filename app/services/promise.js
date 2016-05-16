var PromiseService = function ($http, $q) {
    return function (callback) {
        var defer = $q.defer();
        callback(defer);
        return defer.promise;
    };
};

PromiseService.$inject = ['$http', '$q'];