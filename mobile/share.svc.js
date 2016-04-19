var app = angular.module('mobile');

app.factory('ShareSvc', function () {
    var getCurrentUser = function () {
        return "test";
    };

    return {
        UserID: getCurrentUser()
    }
});