var app = angular.module('mobile');

app.controller('Favorite', function ($scope, FavoriteSvc) {
    initFavorites();

    $scope.unlike = function (goodID) {
        var favoriteID = $scope.favorites[$scope.favoriteGoodIDs.indexOf(goodID)]._id;
        FavoriteSvc.delete(favoriteID).then(function () {
            initFavorites();
        });
    };

    function initFavorites() {
        FavoriteSvc.listIntact().then(function (goods) {
            $scope.goods = goods;
            FavoriteSvc.listSimple().then(function (favorites) {
                $scope.favorites = favorites;
                $scope.favoriteGoodIDs = favorites.map(function (fav) {
                    return fav.goodID;
                });
            });
        });
    }
});