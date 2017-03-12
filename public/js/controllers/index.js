'use strict';

angular.module('ds.controllers.index', []).

controller('HeadCtrl', function ($scope, socket, $rootScope, $location) {
    var device = window.deviceType;
    $scope.deviceType = device;

    $rootScope.connected = false;
    // Testpfad
    //$location.path('/ds/remote/projects/geolo-app-2016');
    //



    socket.on('pair:init', function() {
        socket.emit('pair:deviceType', { deviceType: device });
    });
}).
// global controller
controller('GlobalCtrl', function($scope, $route, $timeout, $rootScope, $location, socket, $window) {
    $scope.showMobileNav = false;
    $scope.showFilterNav = false;
    $scope.$route = $route;

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.historyBack = function () {
        $window.history.back();

    };
    $scope.goToHome = function () {
        $location.path('/');
    };

    $scope.goToAbout = function () {
        $location.path('/ds/about');
    };

    $scope.goToProjects = function () {
        $location.path('/ds/projects');
    };

    $scope.goToContact = function () {
        $location.path('/ds/contact');
    };

    $scope.goToImprint = function () {
        $location.path('/ds/imprint');
    };

    $scope.goToPrivacy = function () {
        $location.path('/ds/privacy');
    };


    // SUBNAV
    $scope.moveTo = function (id) {
        $.fn.fullpage.moveTo(id);
    };




    $scope.$on('$viewContentLoaded', function(){
        $("#fullpage").css('opacity','1')
    });


    $scope.$on('$routeChangeSuccess', function() {


    });



});

