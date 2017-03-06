'use strict';

angular.module('ds.controllers.desktop', [
]).directive('myRepeatDirective', function() {
    return function(scope, element, attrs) {

        if (scope.$last){
            console.log($(".instagram .image img").width())
       console.log(element.context.clientWidth)
        }
    };
}).
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
        $rootScope.connected = true;
        $location.path('/');
    });


}).
controller('PcMainCtrl', function ($scope, $location, socket, $window, $http, $timeout, $rootScope) {

    $timeout(function () {
        $(".welcome").animateCss('fadeInDown');
        $(".welcome").css('opacity','1')
    },1500);

    $scope.instagram = '' ;
    $scope.instagram = '' ;

    $http.get('/api//json/instagram').then(function (res) {

        $timeout(function () {
            $scope.instagram = res.data;
            $(".infoboxes").animateCss('fadeInUp');
            $(".infoboxes").css('opacity','1')
        },3000)
    });

    $http.get('/api//json/github').then(function (res) {
        $scope.github = res.data;

    });


    // ON SOCKET EVENTS
    socket.on('home:connected', function() {
        $location.path('/');
    });
    socket.on('about:connected', function() {
        $location.path('/ds/about');
    });
    socket.on('projects:connected', function() {
        $location.path('/ds/projects');
    });
    socket.on('contact:connected', function() {
        $location.path('/ds/contact');
    });

    socket.on('externalLink:connected', function(data) {
        $window.open(data.url, '_blank');
    });

    socket.on('fullpage:moveToSection', function(data) {
        $.fn.fullpage.moveTo(data.goToSection);

    });



    // Disconncted
    socket.on('disconnected', function() {
        $window.location.reload();

    });

    // History Back
    socket.on('back:connected', function (data) {
        $location.path(data.link);
    });

    // SMARTPHONE
    if($("body").width() < 900){
        $(".instabox h4").click(function () {
            $(".instabox .image").fadeToggle();
        });

        $(".gitbox h4").click(function () {
            $(".gitbox .github").fadeToggle();
        });

        $(".processbox h4").click(function () {
            $(".processbox .process").fadeToggle();
        });
    }




    $timeout(function () {
        if($("body").width() > 900) {
            var divWidth = $('.instagram img').width();
            $('.instagram img').height(divWidth);
        }
    },4000)


    $(window).resize(function(){
        var divWidth = $('.instagram img').width();
        $('.instagram img').height(divWidth);
    });
}).

controller('PcAboutCtrl', function ($scope, $timeout,$location, socket, $window) {
    $scope.activeSkill = 0;
    $scope.activeVita = 0;


    $scope.showSkill = function (area) {
       $scope.activeSkill = area;
       drawAll();
    }

    $scope.showVita = function (area) {
        $scope.activeVita = area;
    }

    // FULLPAGE
    $timeout(function () {
        $("#fullpage").css("opacity", "1");
        // ACTIVE FULLPAGE
        if ($('html').hasClass('fp-enabled')) {
            $.fn.fullpage.destroy('all');
        }
        $('#fullpage').fullpage({
            sectionsColor: ['#e8e8e8', '#49afa4', '#34495e', '#e8e8e8'],

            afterLoad: function (anchorLink, index) {

                if (index == 1) {
                    $(".skills, .overlay").hide();
                    $(".social").css("opacity", "0");
                    $(".left, .right").show();
                    $('.left').animateCss('fadeInLeft');
                    $('.right').animateCss('fadeInRight');


                    setTimeout(function () {
                        $(".social").css("opacity", "1");
                        $('.social').animateCss('fadeInUp');
                    }, 1000)
                }

                if (index == 2) {
                    $('.skills').show().animateCss('fadeInUp');
                    drawAll();
                    $(".overlay").hide();
                }


                if (index == 3) {
                    $('.overlay').show().animateCss('fadeInDown');
                }
                if (index != 4) {
                    $(".scroll").show().animateCss('fadeInUp');
                }
                if (index == 4) {
                    $(".overlay").hide();

                    $(".scroll").hide();

                }


                index = index + 1

                $(".current span").removeClass("active");
                $(".current span:nth-child(" + index + ")").addClass("active");

            },
            onLeave: function (index, nextIndex, direction) {
                $(".scroll").hide();


                if (nextIndex == 1) {
                    $(".left, .right").hide();
                }

                if (nextIndex == 2) {
                    $(".skills").hide();
                    $('.left').animateCss('fadeOutLeft');
                    $('.right').animateCss('fadeOutRight');


                }
            }


        })
    },0)


    // SOCKET EVENTS

    socket.on('about:changeSkills', function(data) {
        $scope.showSkill(data.skill)

    });



}).
controller('PcMapCtrl', function($scope, NgMap) {
    $scope.coordinates = {
        lat: "49.348915",
        lng: "9.129383",
    };

    $scope.setCoordinates = function (lat,lng,nr) {
        $scope.coordinates.lat = lat;
        $scope.coordinates.lng = lng;
        $('.gmap').animateCss('fadeIn');


    };

    NgMap.getMap().then(function(map) {
            var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}];
            map.setOptions({styles: styles, scrollwheel: false,});
            map.data.setStyle(styles);

    });
}).
controller('PcProjectsCtrl', function ($scope, $http, $location, socket) {

    $scope.allProjects = "";

    $http.get('/api/json/get/projects').then(function (res) {
        $scope.allProjects = res.data
        $(".projects").animateCss('zoomIn');
        $(".projects").css("opacity","1")

    });

    socket.on('project:showDetail', function (data) {
        console.log(data)
        $location.path('/ds/projects/'+data.alias);
    });


}).
controller('PcProjectDetailsCtrl', function ($scope, $rootScope, $route, $http, $timeout) {



    $timeout(function () {
        var config = {
            data:  $route.current.params.alias,
            params: {alias: $route.current.params.alias}
        }



        $scope.project = "";

        $http.get('/api//json/get/project/detail',config).then(function (res) {
            $scope.project = res.data;
            $(".projectdetails").animateCss('fadeIn');
            $(".projectdetails").css("opacity","1")

            $('.slider').carousel({
                interval: 5000,
                pause: false
            })

        });


    },0)






}).

controller('PcContactCtrl', function ($timeout, $scope, $route, $http) {

    $scope.sended = false;

    $timeout(function () {
        $("#fullpage").css("opacity", "1");
        $('.box').animateCss('fadeIn');


        $('#fullpage').fullpage({
            sectionsColor: ['#e8e8e8', '#34495e', '#ffffff', '#e8e8e8'],

        });
    },0)

    $scope.submit = function () {


        $http.post('/api/post/contact', {
            from: $scope.name,
            mail: $scope.mail,
            message: $scope.message
        })
            .then(
                function(response){
                    $scope.sended = true;

                },
                function(response){
                    // failure callback
                }
            );
    }

    

});


