    $(document).ready(function() {


        $.fn.extend({
            animateCss: function (animationName) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                this.addClass('animated ' + animationName).one(animationEnd, function() {
                    if(animationName == "fadeOutLeft" || animationName == "fadeOutLeft"){
                        $(this).removeClass('animated ' + animationName);
                        $(".left, .right").hide();
                    }

                    $(this).removeClass('animated ' + animationName);



                });
            }
        });

    });
