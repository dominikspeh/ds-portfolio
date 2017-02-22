'use strict';

angular.module('ds.controllers.desktop', [
]).
controller('PcCodeCtrl', function ($scope, $rootScope, $location, socket) {
    socket.on('pair:sendCode', function(data) {

        $rootScope.url = $location.absUrl();
        $rootScope.host = $location.host()+"/";
        $rootScope.code  = data.code;
        $rootScope.code1 = data.code.charAt(0);
        $rootScope.code2 = data.code.charAt(1);
        $rootScope.code3 = data.code.charAt(2);
        $rootScope.code4 = data.code.charAt(3);

    });

    // To Succes-Page if Code is correct
    socket.on('pair:connected', function() {
        $location.path('/ds/success');
    });


}).
controller('PcMainCtrl', function ($scope, $location, socket, $window) {


    // Disconncted
    socket.on('disconnected', function() {
        $window.location.reload();

    });

    // History Back
    socket.on('back:connected', function (data) {
        $location.path(data.link);
    });


}).
controller('PcAboutCtrl', function ($scope, $timeout,$location, socket, $window) {
$scope.activeSkill = 0;

$scope.showSkill = function (area) {
   $scope.activeSkill = area;
   drawAll();

}





});


