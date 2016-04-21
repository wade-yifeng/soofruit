var app = angular.module('mobile');

app.factory('ShareSvc', function ($q) {
    var getUserID = function () {
        return "5717992a2bfc5eac119ecec3";
    };

    var getUserName = function () {
        return "习近平";
    };

    return {
        UserID: getUserID(),
        UserName: getUserName(),
        promise: function (logic) {
            var defer = $q.defer();
            logic(defer);
            return defer.promise;
        }
    }
});