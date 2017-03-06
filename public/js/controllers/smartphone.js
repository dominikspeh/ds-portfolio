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
    $(".ds").css("padding-right","0")


    // EMIT
    $scope.browserGoToHome = function () {
        socket.emit('home:init', {});
    };
    $scope.browserGoToAbout = function () {
        socket.emit('about:init', {});
    };
    $scope.browserGoToProjects = function () {
        socket.emit('projects:init', {});
    };
    $scope.browserGoToContact = function () {
        socket.emit('contact:init', {});
    };
    $scope.externalLink = function (data) {
        socket.emit('externalLink:init', {url: data });
    };

    // ON
    socket.on('home:connected', function () {
        $location.path('/ds/success');
    });
    socket.on('about:connected', function () {
        $location.path('/ds/remote/about');
    });
    socket.on('projects:connected', function () {
        $location.path('/ds/remote/projects');
    });
    socket.on('contact:connected', function () {
        $location.path('/ds/remote/contact');
    });
}).

// Main Controller / After Pairing
controller("MobileAboutCtrl", function ($scope, $routeParams, $timeout, $location, $window, socket, $rootScope) {
    var sections = ["No more section","About me","Skills","Vita","Certificates","No more section"];

    $scope.prevSection = "",
    $scope.nextSection = "Skills";
    $scope.currentSection = 1;
    $scope.activeSkill = 0;
    $scope.maxSize = 4;

    $scope.changeSection = function (newSection) {
        $scope.currentSection = newSection;
        socket.emit('fullpage:moveSection', {goToSection: newSection});

        $scope.prevSection = sections[newSection-1];
        $scope.nextSection = sections[newSection+1];

    };

    $scope.changeSkills = function (newSkill) {
        $scope.activeSkill = newSkill;
        socket.emit('about:skillInit', {skill: newSkill});
    };

}).
controller("MobileProjectCtrl", function ($scope, $timeout, $location, socket, $http) {

    $scope.allProjects = "";

    $http.get('/api/json/get/projects').then(function (res) {
        $scope.allProjects = res.data;

    });

    $scope.goToDetail = function (alias) {
        socket.emit('project:detailInit', {alias: alias});
    }

    socket.on('project:showDetail', function (data) {
        $location.path('/ds/remote/projects/'+data.alias);
    });
}).
controller("MobileProjectDetailCtrl", function ($scope, $timeout, $location, socket, $http, $route) {
    var sectionOne = ["No more sections","Project informations","Workflow", "Gallery"];
    var sectionTwo = ["No more sections","Project informations", "Gallery"];
    $scope.prevSection = "";
    $scope.nextSection = "";
    $scope.currentSection = 1;
    $scope.activeSkill = 0;
    $scope.maxSize

    $scope.changeSection = function (newSection) {
        $scope.currentSection = newSection;
        socket.emit('fullpage:moveSection', {goToSection: newSection});

        if($scope.maxSize == 3){
            $scope.prevSection = sectionOne[newSection-1];
            $scope.nextSection = sectionOne[newSection+1];
        }
        if($scope.maxSize == 2){
            $scope.prevSection = sectionTwo[newSection-1];
            $scope.nextSection = sectionTwo[newSection+1];
        }

    };

    $timeout(function () {
        var config = {
            data:  $route.current.params.alias,
            params: {alias: $route.current.params.alias}
        }

        $scope.project = "";

        $http.get('/api//json/get/project/detail',config).then(function (res) {
            $scope.project = res.data;
            $(".projectdetails").animateCss('fadeIn');
            $(".projectdetails").css("opacity","1");

            if($scope.project.galerie.length > 0 && $scope.project.process.length > 0){
                $scope.maxSize = 3
                $scope.nextSection = "Workflow";
            }
            if($scope.project.galerie.length > 0 && $scope.project.process.length == 0){
                $scope.maxSize = 2
                $scope.nextSection = "Gallery";
            }
            if($scope.project.galerie.length == 0 && $scope.project.process.length == 0){
                $scope.maxSize = 1
                $scope.nextSection = "No more section";
            }

            $('.slider').carousel({
                interval: 5000,
                pause: false
            })

        });


    },0)
});


