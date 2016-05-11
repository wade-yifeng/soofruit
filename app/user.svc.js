var app = angular.module('mobile');

app.factory('UserSvc', function ($http, ShareSvc) {
    return {
        getPoints: function (userID) {
            return ShareSvc.promise(function (defer) {
                $http.get('/userPoints/' + userID).success(function (result) {
                    httpSuccess(result, defer, true);
                });
            });
        },
        updatePoints: function (userID, points) {
            return ShareSvc.promise(function (defer) {
                $http.post('/userPoints', {_id: userID, points: points}).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        }
    }
});