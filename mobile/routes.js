var app = angular.module('mobile', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list");

    $stateProvider
        .state('list', {
            url: "/list",
            controller: "List",
            templateUrl: 'pages/list.html'
        })
        .state('detail', {
            url: "/detail",
            controller: 'Detail',
            templateUrl: 'pages/detail.html'
        })
        .state('cart', {
            url: "/cart",
            controller: 'Cart',
            templateUrl: 'pages/cart.html'
        })
        .state('checkout', {
            url: "/checkout",
            controller: 'Checkout',
            templateUrl: 'pages/checkout.html'
        })
        .state('ordersOngoing', {
            url: "/ordersOngoing",
            controller: 'OrdersOngoing',
            templateUrl: 'pages/orders_ongoing.html'
        })
        .state('ordersDone', {
            url: "/ordersDone",
            controller: 'OrdersDone',
            templateUrl: 'pages/orders_done.html'
        })
        .state('addressSelect', {
            url: "/addressSelect",
            controller: 'AddressSelect',
            templateUrl: 'pages/popup_address_select.html'
        })
        .state('addressEdit', {
            url: "/addressEdit",
            controller: 'AddressEdit',
            templateUrl: 'pages/popup_address_edit.html'
        });
});