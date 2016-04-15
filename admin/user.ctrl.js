var app = angular.module('admin');

//strategy controller
app.controller('userCtrl', function ($scope, $http, $route) {
    $http.get('/users').success(function (result) {
        $scope.users = result;  
    });
    
    $scope.Signin = function (user) {
        $http.post('/user/signin', user).success(function (result) {
            var a = 1;
        });
    }

});