var app = angular.module('admin');
var title = 'User Management';

app.controller('UserMana', function ($scope, UserManaSvc, $http) {
    document.title = title;

    UserManaSvc.listPaged(1).then(function (result) {
        $scope.users = result.data;
    });

    $http.get('/roleCategories').success(function (result) {
        $scope.RoleCategories = result;
    });

    $scope.user = {
        name: '',
        weChatId: '',
        mobile: '',
        email: '',
        description: '',
        role: ''
    };

    //$scope.createUser = function (user) {
    //    $http.post('/users', user).success(function (result) {
    //        if (!result.code) {
    //            $route.reload();
    //        }
    //    });
    //};
    //
    //$scope.deleteUser = function(_id){
    //    $http.delete('/users/' + _id).success(function (result) {
    //        if (result.code == 0) {
    //            $route.reload();
    //        }
    //    });
    //};

    $scope.formatDatetime = function (datetime) {
        return new Date(datetime).toLocaleString();
    }
});