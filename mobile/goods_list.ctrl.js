var app = angular.module('mobile');

app.controller('List', function ($scope, $http) {
    $http.get('/addresses/' + 'test').success(function (result) {
        httpSuccess(result, defer, true);
    });
});