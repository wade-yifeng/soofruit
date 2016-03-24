var app = angular.module('admin');
var title = 'Strategy Management';

//strategy controller
app.controller('strategyCtrl', function ($scope, $http, $route) {
    document.title = title;
    
    $http.get('/strategies').success(function (result) {
        $scope.strategies = result;
    });
    
    $http.getStrategy = function (_id) {
        $http.get('/strategies/:id', { id: _id }).success(function (result) {
            if (!result.code) {
                $scope.updateStrategy = result;
            }
        });
    };
    
    $scope.addStrategy = function (strategy) {
        $http.post('/strategies', strategy).success(function (result) {
            if (!result.code) {
                $route.reload();
            }
        });
    };
    
    $scope.deleteStrategy = function (_id) {
        $http.delete('/strategies/:id', { id: _id }).success(function (result) {
            if(!result.code) {
                $route.reload();
            }
        });
    };
});
