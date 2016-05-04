var app = angular.module('mobile');

app.controller('List', function ($scope, GoodSvc, CartSvc, ShareSvc, FavoriteSvc) {
    document.title = '欢迎来到北海之南大果园';

    GoodSvc.listPaged(1).then(function (result) {
        $scope.goods = result.data;
        initFavorites();
        activateSlider();
    });

    CartSvc.getCartSession().then(function (cart) {
        initCartIcon(cart);
    }, initCartIcon);

    $scope.isLike = function (goodID) {
        return $scope.favoriteGoodIDs.indexOf(goodID) != -1;
    };

    $scope.setLike = function (goodID) {
        if (!$scope.isLike(goodID)) {
            ShareSvc.user().then(function (user) {
                FavoriteSvc.create({userID: user._id, goodID: goodID}).then(function (info) {
                    initFavorites();
                    showInfo(info);
                });
            });
        } else {
            var favoriteID = $scope.favorites[$scope.favoriteGoodIDs.indexOf(goodID)]._id;
            FavoriteSvc.delete(favoriteID).then(function () {
                initFavorites();
            });
        }
    };

    function initFavorites() {
        FavoriteSvc.listSimple().then(function (favorites) {
            $scope.favorites = favorites;
            $scope.favoriteGoodIDs = favorites.map(function (fav) {
                return fav.goodID;
            });
        });
    }
});