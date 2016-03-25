var app = angular.module('admin');

//strategy controller
app.controller('strategyCtrl', function ($scope, $http, $route) {
    
    document.title = 'Strategy Management';
    var action = 'add';
    
    $http.get('/strategies').success(function (result) {
        $scope.strategies = result;
    });
    
    $http.getStrategy = function (_id) {
        $http.get('/strategies/:id', { id: _id }).success(function (result) {
            if (!result.code) {
                $scope.strategy = result;
                action = 'update';
            }
        });
    };
    
    $scope.saveStrategy = function (strategy) {
        if (action === 'add') {
            //TODO: need to create user management
            $http.post('/strategies', strategy).success(function (result) {
                if (!result.code) {
                    $route.reload();
                    //TODO: message show up.
                } else {
                    //TODO: err message show up.
                    alert(result.message);                    
                }
            });
        } else {
            $http.put('/strategies/:id', { id: strategy._id }).success(function (result) {
                if(!result.code) {
                    Clear();
                    $route.reload();                    
                    //TODO: message show up.
                } else {
                    //TODO: err message show up.
                    //result.message;
                }
            });
        }   
    };
    
    $scope.deleteStrategy = function (_id) {
        $http.delete('/strategies/:id', { id: _id }).success(function (result) {
            if(!result.code) {
                $route.reload();
                //TODO: message show up.
            } else {
                //TODO: err message show up.
                //result.message;
            }
        });
    };
    
    $http.get('/goods').success(function (result) {
        $scope.goods = result;
    });
    
    $http.get('/user').success(function (result) {
        $scope.users = result;  
    });
    
    $http.get('/enums').success(function (result) {
        // TODO: add to HTML5 storage.
        // $window.sessionStorage.setItem('enums', result);
        $scope.strategyType = result.StrategyType;
        $scope.discountType = result.DiscountType;
    });    
        
    $scope.clearContent = function () {
        Clear();
    }
    
    var Clear = function () {
        $scope.strategy = null;
        action = 'add';
    }
});
