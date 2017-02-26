'use strict';

angular.module('ds',['angular-loading-bar','ngMap','ngAnimate','btford.socket-io','ds.controllers.index','ds.controllers.desktop','ds.controllers.smartphone','ngRoute','angular-google-analytics']).
factory('socket', function(socketFactory) {
    return socketFactory();
}).
config(function ($routeProvider, $locationProvider, AnalyticsProvider ) {
    AnalyticsProvider.setAccount('UA-XXX-XXX-XX');

    $routeProvider.
    when('/', {
        templateUrl: '/partials/desktop/index'
    }).
    when('/:code', {
        templateUrl: '/partials/desktop/index'
    }).
    when('/ds/success', {
        templateUrl: '/partials/desktop/success'
    }).
    when('/ds/about', {
        title: 'About me',
        templateUrl: '/partials/desktop/about'
    }).
    when('/ds/projects', {
        title: 'Projects',
        templateUrl: '/partials/desktop/projects'
    }).
    when('/ds/projects/:alias', {
        templateUrl: '/partials/desktop/projectdetails'
    }).
    when('/ds/contact', {
        templateUrl: '/partials/desktop/contact'
    }).
    when('/ds/imprint', {
        templateUrl: '/partials/desktop/imprint'
    }).
    when('/ds/privacy', {
        templateUrl: '/partials/desktop/privacy'
    }).
    when('/ds/test', {
        templateUrl: '/partials/' + window.deviceType + '/privacy'
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });



}).
run(function(Analytics) {});