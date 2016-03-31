/**
 * Created by Jesse Qin on 3/19/2016.
 */

var app = angular.module('admin');
var title = 'User Management';

app.controller('UserManager', function ($scope, $http, $route) {
    document.title = title;

    $http.get('/user').success(function (result){
        $scope.Users = result;
    });

    $http.get('/roleCategories').success(function (result){
        $scope.RoleCategories = result;
    });

    $scope.User = {
        name: '',
        weChatId: '',
        mobile: '',
        email: '',
        description: '',
        role: ''
    };

    $scope.createUser = function (user) {

        $http.post('/user', user).success(function (result) {
            if (!result.code) {
                $route.reload();
            }
        });
    };

    $scope.deleteUser = function(_id){
        $http.delete('/user/' + _id).success(function (result) {
            if (result.code == 0) {
                $route.reload();
            }
        });
    };
});