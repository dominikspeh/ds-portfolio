'use strict';

angular.module('ds.controllers.smartphone', [
]).

// Code Controller
controller('MobileCodeCtrl', function($scope,$rootScope, $routeParams, $timeout, $location, $window, socket) {

    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {

        $(document)
            .on('focus', 'input', function(e) {
                $('body').addClass('fixfixed');
                $(".footer").hide();

            })
            .on('blur', 'input', function(e) {
                $('body').removeClass('fixfixed');
                $(".footer").show();
            });

    }
    else {
        $(".codeInput").click(function () {
            $('html, body').animate({
                scrollTop: $(".formbody").offset().top
            }, 500);
        })

    }


    $window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    var paramCode = $routeParams.code;
    $scope.isCodeInvalid = false;

    if(paramCode){
        fillForm(paramCode);
        console.log("aa")
        $timeout(function () {
            socket.emit('pair:getCode', { code: paramCode});
        }, 2000);
    }

    var codeInput = "";

    $(".codeArea").click(function () {
        $("input").val("");
        $(".codeArea input:first-child").focus();
    });

    $(".codeArea input").keydown(function () {
        $(".count span").text("");
        if($(this).val().length != 0){
            $(this).val("");
            codeInput = "";
        }
    });

    $(".codeArea input").keyup(function (e) {

        if(e.keyCode == 8) {
            // Code aktualisieren
            codeInput = codeInput.substring(0, codeInput.length-1);

            if($(this).prev().is("input")){
                $(this).prev().val("");
                $(this).prev().focus();
            }
        }

        else{
            $scope.isCodeInvalid = false;

            codeInput = codeInput+$(this).val();

            if($(this).next().is("input")){
                $(this).next().focus();
            }

            else {

                socket.emit('pair:getCode', { code: codeInput}, function () {
                });


            }

        }

    });


    // SOCKET EVENTS 

    socket.on('pair:fail', function() {
        codeError();
    });

    socket.on('pair:connected', function() {
        $location.path('/ds/success');
    });


    socket.on('success:connected', function () {
        $location.path('/ds/success');
    });



    function codeError(){
        $scope.isCodeInvalid = true;
        paramCode = null;
        codeInput = "";
        $("input").val("");

        $(".count span").text("Code ungültig");
        $(".codeArea input:first-child").focus();


        $scope.isCodeInvalid = false;

    }

    function fillForm(code){
        $("input:nth-child(1)").val(code.charAt(0));
        $("input:nth-child(2)").val(code.charAt(1));
        $("input:nth-child(3)").val(code.charAt(2));
        $("input:nth-child(4)").val(code.charAt(3));


    }
}).

// Main Controller / After Pairing
controller("MobileMainCtrl", function ($scope, $routeParams, $timeout, $location, $window, socket, $rootScope) {

});
