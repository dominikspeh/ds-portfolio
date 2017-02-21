'use strict';

angular.module('ds.controllers.index', []).

controller('HeadCtrl', function ($scope, socket, $location) {
    var device = window.deviceType;
    $scope.deviceType = device;

    // Testpfad
   // $location.path('/hbc/remote');
    //

    socket.on('pair:init', function() {
        socket.emit('pair:deviceType', { deviceType: device });
    });
}).
// global controller
controller('GlobalCtrl', function($scope, $location, socket) {
    $scope.showMobileNav = false;

    $scope.goToAbout = function () {
        $location.path('/ds/about');
    }




});

