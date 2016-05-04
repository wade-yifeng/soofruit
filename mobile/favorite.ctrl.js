var app = angular.module('mobile');

app.controller('Favorite', function ($scope, FavoriteSvc) {
    FavoriteSvc.listIntact().then(function (favorites) {
        $scope.favorites = favorites;
    });
});