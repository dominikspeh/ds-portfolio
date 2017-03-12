'use strict';

angular.module('ds',['angular-loading-bar','ngMap','ngAnimate','btford.socket-io','ds.controllers.index','ds.controllers.desktop','ds.controllers.smartphone','ngRoute','angular-google-analytics']).
factory('socket', function(socketFactory) {
    return socketFactory();
}).

filter('trustAsResourceUrl', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
}]).
config(function ($routeProvider, $locationProvider, AnalyticsProvider ) {
    AnalyticsProvider.setAccount('UA-52323715-7');

    $routeProvider.
    when('/', {
        templateUrl: '/partials/' + window.deviceType + '/index'
    }).
    when('/:code', {
        templateUrl: '/partials/smartphone/code'
    }).
    when('/ds/mobile', {
        templateUrl: '/partials/desktop/index'
    }).
    when('/ds/remote', {
        templateUrl: '/partials/smartphone/code'
    }).
    when('/ds/success', {
        templateUrl: '/partials/smartphone/success'
    }).
    when('/ds/remote/about', {
        templateUrl: '/partials/smartphone/about'
    }).
    when('/ds/remote/projects', {
        templateUrl: '/partials/smartphone/projects'
    }).
    when('/ds/remote/projects/:alias', {
        templateUrl: '/partials/smartphone/projectdetails'
    }).
     when('/ds/remote/contact', {
        templateUrl: '/partials/smartphone/contact'
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
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });



}).

run(function(Analytics) {});