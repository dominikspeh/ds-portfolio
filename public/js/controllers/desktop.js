'use strict';

angular.module('ds.controllers.desktop', [
]).
controller('PcCodeCtrl', function ($scope, $location, socket) {
    socket.on('pair:sendCode', function(data) {

        $scope.url = $location.absUrl();
        $scope.host = $location.host()+"/";
        $scope.code  = data.code;
        $scope.code1 = data.code.charAt(0);
        $scope.code2 = data.code.charAt(1);
        $scope.code3 = data.code.charAt(2);
        $scope.code4 = data.code.charAt(3);

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
controller('PcAboutCtrl', function ($scope, $location, socket, $window) {

    fullpage.initialize('#fullpage', {
        css3:true
    });


});


