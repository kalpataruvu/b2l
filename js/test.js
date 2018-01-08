//Global var
var CRUMINA = {};

(function ($) {

    // USE STRICT
    "use strict";

    //----------------------------------------------------/
    // Predefined Variables
    //----------------------------------------------------/
    var $window = $(window),
        $document = $(document),
        $body = $('body'),

        swipers = {},
        //Elements
        $header = $('#site-header'),
        $counter = $('.counter'),
        $progress_bar = $('.skills-item'),
        $pie_chart = $('.pie-chart'),
        $animatedIcons = $('.js-animate-icon'),
        $asidePanel = $('.right-menu'),
        $primaryMenu = $('.primary-menu'),
        $footer = $('#site-footer');



    var $popupSearch = jQuery(".popup-search");
    var $cartPopap = jQuery(".cart-popup-wrap");

    /* -----------------------------
     * Sliders and Carousels
     * ---------------------------*/

    CRUMINA.initSwiper = function () {
        var initIterator = 0;
        var $breakPoints = false;
        $('.swiper-container').each(function () {

            var $t = $(this);
            var index = 'swiper-unique-id-' + initIterator;

            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.find('.swiper-pagination').addClass('pagination-' + index);

            var $effect = ($t.data('effect')) ? $t.data('effect') : 'slide',
                $crossfade = ($t.data('crossfade')) ? $t.data('crossfade') : true,
                $loop = ($t.data('loop') == false) ? $t.data('loop') : true,
                $showItems = ($t.data('show-items')) ? $t.data('show-items') : 1,
                $scrollItems = ($t.data('scroll-items')) ? $t.data('scroll-items') : 1,
                $scrollDirection = ($t.data('direction')) ? $t.data('direction') : 'horizontal',
                $mouseScroll = ($t.data('mouse-scroll')) ? $t.data('mouse-scroll') : false,
                $autoplay = ($t.data('autoplay')) ? parseInt($t.data('autoplay'), 10) : 0,
                $autoheight = ($t.hasClass('auto-height')) ? true: false,
                $slidesSpace = ($showItems > 1) ? 20 : 0;

            if ($showItems > 1) {
                $breakPoints = {
                    480: {
                        slidesPerView: 1,
                        slidesPerGroup: 1
                    },
                    768: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    }
                }
            }

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                pagination: '.pagination-' + index,
                paginationClickable: true,
                direction: $scrollDirection,
                mousewheelControl: $mouseScroll,
                mousewheelReleaseOnEdges: $mouseScroll,
                slidesPerView: $showItems,
                slidesPerGroup: $scrollItems,
                spaceBetween: $slidesSpace,
                keyboardControl: true,
                setWrapperSize: true,
                preloadImages: true,
                updateOnImagesReady: true,
                autoplay: $autoplay,
                autoHeight: $autoheight,
                loop: $loop,
                breakpoints: $breakPoints,
                effect: $effect,
                fade: {
                    crossFade: $crossfade
                },
                parallax: true,
                onImagesReady: function (swiper) {

                },
                onSlideChangeStart: function (swiper) {
                    if ($t.find('.slider-slides').length) {
                        $t.find('.slider-slides .slide-active').removeClass('slide-active');
                        var realIndex = swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index');
                        $t.find('.slider-slides .slides-item').eq(realIndex).addClass('slide-active');
                    }
                }
            });
            initIterator++;
        });

        //swiper arrows
        $('.btn-prev').on('click', function () {
            swipers['swiper-' + $(this).parent().attr('id')].slidePrev();
        });

        $('.btn-next').on('click', function () {
            swipers['swiper-' + $(this).parent().attr('id')].slideNext();
        });

        //swiper tabs
        $('.slider-slides .slides-item').on('click', function () {
            if ($(this).hasClass('slide-active')) return false;
            var activeIndex = $(this).parent().find('.slides-item').index(this);
            swipers['swiper-' + $(this).closest('.swiper-container').attr('id')].slideTo(activeIndex + 1);
            $(this).parent().find('.slide-active').removeClass('slide-active');
            $(this).addClass('slide-active');

            return false;

        });
    };


    /* -----------------------------
     * On DOM ready functions
     * ---------------------------*/

    $document.ready(function () {

        if ($('#menu-icon-wrapper').length) {
            CRUMINA.burgerAnimation();
        }
        // 3-d party libs run
        $primaryMenu.crumegamenu({
            showSpeed: 300,
            hideSpeed: 200,
            trigger: "hover",
            animation: "drop-up",
            indicatorFirstLevel: "&#xf0d7",
            indicatorSecondLevel: "&#xf105"
        });

        CRUMINA.initSwiper();



        // Dom mofifications
        $('select').niceSelect();



        // Row background animation
        if ($('.subscribe').length) {
            CRUMINA.SubscribeScrollAnnimation();
        }
        if ($('.seo-score').length) {
            CRUMINA.SeoScoreScrollAnnimation();
        }
        if ($('.testimonial-slider').length) {
            CRUMINA.TestimonialScrollAnnimation();
        }
        if ($('.our-vision').length) {
            CRUMINA.OurVisionScrollAnnimation();
        }
        if ($('.background-mountains').length) {
            CRUMINA.MountainsScrollAnnimation();
        }
    });
})(jQuery);
