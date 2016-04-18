var app = angular.module('mobile', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list");

    $stateProvider
        .state('list', {
            url: "/list",
            controller: "List",
            templateUrl: '/views/list.html'
        })
        .state('detail', {
            url: "/detail",
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
        .state('account', {
            url: "/account",
            controller: 'Account',
            templateUrl: '/views/account.html'
        })
        .state('addressSelect', {
            url: "/addressSelect",
            controller: 'AddressSelect',
            templateUrl: '/views/popup_address_select.html'
        })
        .state('addressEdit', {
            url: "/addressEdit",
            controller: 'AddressEdit',
            templateUrl: '/views/popup_address_edit.html'
        });
});