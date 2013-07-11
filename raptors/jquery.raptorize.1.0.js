/*
 * jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Modified
*/


(function ($) {
    // If you can see this message maybe you should come and work here. We're hiring!
    // http://fromthe7th.com/posts/2013/04/developer-open-job-positions
    
    var raptorUrls = [
        '/_/media/prehistoric-trends/raptor1.png',
        '/_/media/prehistoric-trends/raptor2.png',
        '/_/media/prehistoric-trends/raptor3.png',
        '/_/media/prehistoric-trends/raptor4.png',
        '/_/media/prehistoric-trends/raptor5.png',
        '/_/media/prehistoric-trends/raptor6.png',
        '/_/media/prehistoric-trends/raptor7.png',
        '/_/media/prehistoric-trends/raptor8.png',
        '/_/media/prehistoric-trends/raptor9.png',
        '/_/media/prehistoric-trends/prehistoric_trends.png'
    ];
    var raptorCounter = 0;

    $.fn.raptorize = function (options) {
        AnalyticsUtils.trackEvent("Special", "Raptor", null, null);

        var randomImageUrl = raptorUrls[Math.floor(Math.random() * raptorUrls.length)];
        //Yo' defaults
        var defaults = {
            enterOn: 'timer', //timer, konami-code, click
            delayTime: 100 //time before raptor attacks on timer mode
        };

        //Extend those options
        var options = $.extend(defaults, options);

        return this.each(function () {

            var _this = $(this);
            var audioSupported = false;
            //Stupid Browser Checking which should be in jQuery Support
            if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) {
                audioSupported = true;
            }

            $("#elRaptor").remove();
            //Raptor Vars
            var raptorImageMarkup = '<img style="display: none;z-index:30000" src="' + randomImageUrl + '" />';
            var locked = false;

            //Append Raptor and Style
            var raptor = $(raptorImageMarkup);
            $('body').append(raptor);
            raptor.css({
                "position": "fixed",
                "bottom": "-310px",
                "right": "0",
                "display": "block"
            })

            init();

            function init() {
                var image = new Image();
                image.onload = function () { initAfterImageLoad() };
                image.src = randomImageUrl;
            }

            // Animating Code
            function initAfterImageLoad() {
                locked = true;

                // Movement Hilarity	
                raptor.animate({
                    "bottom": "0"
                }, function () {

                    $(this).animate({
                        "bottom": "-20px"
                    }, 100, function () {
                        var offset = (($(this).position().left) + 400);
                        $(this).delay(300).animate({
                            "right": offset
                        }, 2200, function () {
                            raptor.remove();
                            locked = false;
                        })
                    });
                });
            }


        }); //each call
    } //orbit plugin call
})(jQuery);

$("body").raptorize();
$(window).scrollTop(9999999); // run away!
        
