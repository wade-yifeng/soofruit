/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('admin');
var title = 'Fruits Management';

app.controller('Fruit', function ($scope, $http, $route) {
    document.title = title;

    $http.get('/fruits').success(function (result) {
        $scope.fruits = result;
    });

    $http.get('/fruitCategories').success(function (result) {
        $scope.fruitCategories = result;
    });

    $scope.getFruit = function (_id) {
        $http.get('/fruits/' + _id).success(function (result) {
            if (!result.code) {
                $scope.fruitEdit = result;
            }
        });
    };

    $scope.createFruit = function (fruit) {
        $http.post('/fruits', fruit).success(function (result) {
            if (!result.code) {
                $route.reload();
            }
        });
    };

    $scope.deleteFruit = function (_id) {
        $http.delete('/fruits/' + _id).success(function (result) {
            if (result.code == 0) {
                $route.reload();
            }
        });
    };
});