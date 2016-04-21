var app = angular.module('mobile', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    var addressSelect = {
        views: {
            'popup': {
                url: "/addressSelect",
                controller: 'AddressSelect',
                templateUrl: '/views/popup_address_select.html'
            }
        }
    };

    var addressEdit = {
        views: {
            'popup': {
                url: "/addressEdit:addressID",
                controller: 'AddressEdit',
                templateUrl: '/views/popup_address_edit.html'
            }
        }
    };

    $urlRouterProvider.otherwise("/list");

    $stateProvider
        .state('list', {
            url: "/list",
            controller: "List",
            templateUrl: '/views/list.html'
        })
        .state('detail', {
            url: "/detail:goodID",
            controller: 'Detail',
            templateUrl: '/views/detail.html'
        })
        .state('cart', {
            url: "/cart",
            controller: 'Cart',
            templateUrl: '/views/cart.html'
        })
        .state('checkout', {
            url: "/checkout",
            controller: 'Checkout',
            templateUrl: '/views/checkout.html'
        })
        .state('ordersOngoing', {
            url: "/ordersOngoing",
            controller: 'OrdersOngoing',
            templateUrl: '/views/orders_ongoing.html'
        })
        .state('ordersDone', {
            url: "/ordersDone",
            controller: 'OrdersDone',
            templateUrl: '/views/orders_done.html'
        })
        .state('my', {
            url: "/my",
            controller: 'My',
            templateUrl: '/views/my.html'
        })
        .state('checkout.addressSelect', addressSelect)
        .state('checkout.addressEdit', addressEdit)
        .state('account.addressSelect', addressSelect)
        .state('account.addressEdit', addressEdit);
});