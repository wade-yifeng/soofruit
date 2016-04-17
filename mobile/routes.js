var app = angular.module('mobile', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list");

    $stateProvider
        .state('list', {
            url: "/list",
            controller: "List",
            templateUrl: '/assets/pages/list.html'
        })
        .state('detail', {
            url: "/detail",
            controller: 'Detail',
            templateUrl: '/assets/pages/detail.html'
        })
        .state('cart', {
            url: "/cart",
            controller: 'Cart',
            templateUrl: '/assets/pages/cart.html'
        })
        .state('checkout', {
            url: "/checkout",
            controller: 'Checkout',
            templateUrl: '/assets/pages/checkout.html'
        })
        .state('ordersOngoing', {
            url: "/ordersOngoing",
            controller: 'OrdersOngoing',
            templateUrl: '/assets/pages/orders_ongoing.html'
        })
        .state('ordersDone', {
            url: "/ordersDone",
            controller: 'OrdersDone',
            templateUrl: '/assets/pages/orders_done.html'
        })
        .state('account', {
            url: "/account",
            controller: 'Account',
            templateUrl: 'pages/account.html'
        })
        .state('addressSelect', {
            url: "/addressSelect",
            controller: 'AddressSelect',
            templateUrl: '/assets/pages/popup_address_select.html'
        })
        .state('addressEdit', {
            url: "/addressEdit",
            controller: 'AddressEdit',
            templateUrl: '/assets/pages/popup_address_edit.html'
        });
});