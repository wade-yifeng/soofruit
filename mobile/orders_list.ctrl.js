var app = angular.module('mobile');

app.controller('Orders', function ($scope, GoodSvc, $stateParams) {
    activateNav($stateParams.listType);
});