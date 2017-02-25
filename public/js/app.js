'use strict';

angular.module('ds',['angular-loading-bar','ngMap','ngAnimate','btford.socket-io','ds.controllers.index','ds.controllers.desktop','ds.controllers.smartphone','ngRoute','angular-google-analytics']).
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
        title: 'About me',
        templateUrl: '/partials/' + window.deviceType + '/about'
    }).
    when('/ds/projects', {
        title: 'Projects',
        templateUrl: '/partials/' + window.deviceType + '/projects'
    }).
    when('/ds/projects/:alias', {
        templateUrl: '/partials/' + window.deviceType + '/projectdetails'
    }).
    when('/ds/success', {
        templateUrl: '/partials/' + window.deviceType + '/success'
    }).
    when('/ds/contact', {
        templateUrl: '/partials/' + window.deviceType + '/contact'
    }).
    when('/ds/imprint', {
        templateUrl: '/partials/' + window.deviceType + '/imprint'
    }).
    when('/ds/privacy', {
        templateUrl: '/partials/' + window.deviceType + '/privacy'
    })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });



}).
run(function(Analytics) {});