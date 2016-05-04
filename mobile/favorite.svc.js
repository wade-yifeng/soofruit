var app = angular.module('mobile');

app.factory('FavoriteSvc', function ($http, ShareSvc) {
    return {
        listSimple: function () {
            return ShareSvc.promise(function (defer) {
                ShareSvc.user().then(function (user) {
                    $http.get('/favoriteSimple/' + user._id).success(function (result) {
                        httpSuccess(result, defer, true);
                    });
                });
            });
        },
        listIntact: function () {
            return ShareSvc.promise(function (defer) {
                ShareSvc.user().then(function (user) {
                    $http.get('/favoriteIntact/' + user._id).success(function (result) {
                        httpSuccess(result, defer, true);
                    });
                });
            });
        },
        create: function (favorite) {
            return ShareSvc.promise(function (defer) {
                $http.post('/favorite', favorite).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        },
        delete: function (favoriteID) {
            return ShareSvc.promise(function (defer) {
                $http.delete('/favorite/' + favoriteID).success(function (result) {
                    httpSuccess(result, defer);
                });
            });
        }
    }
});