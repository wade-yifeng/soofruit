var app = angular.module('mobile');

app.controller('Detail', function ($scope, $stateParams, GoodSvc, CartSvc, FavoriteSvc, ShareSvc) {
    GoodSvc.get($stateParams.goodID).then(function (result) {
        $scope.good = result;
        document.title = result.name;
        initFavorites();
        activateSlider();
    });

    CartSvc.getCartSession().then(function (cart) {
        initCartIcon(cart);
    }, initCartIcon);

    $scope.addToCart = function (good) {
        CartSvc.addToCart(good).then(function () {
            initCartIcon(null, true);
        });
    };

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