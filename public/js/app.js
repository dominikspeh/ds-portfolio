'use strict';

angular.module('ds',['ngAnimate','btford.socket-io','ds.controllers.index','ds.controllers.desktop','ds.controllers.smartphone','ngRoute','angular-google-analytics']).
factory('socket', function(socketFactory) {
    return socketFactory();
}).
config(function ($routeProvider, $locationProvider, AnalyticsProvider ) {
    AnalyticsProvider.setAccount('UA-XXX-XXX-XX');

    $routeProvider.
    when('/', {
        templateUrl: '/partials/' + window.deviceType + '/index'
    }).
    when('/:code', {
        templateUrl: '/partials/' + window.deviceType + '/index'
    }).
    when('/ds/success', {
        templateUrl: '/partials/' + window.deviceType + '/success'
    }).
    when('/ds/about', {
        templateUrl: '/partials/' + window.deviceType + '/about'
    }).
    when('/ds/success', {
        templateUrl: '/partials/' + window.deviceType + '/success'
    }).
    otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });



}).
run(function(Analytics) {});