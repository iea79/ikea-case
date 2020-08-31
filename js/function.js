$(document).ready(function(){
    $('.js-slider').each(function(index, el) {
        const $slider = $(el);
        let slideDots = $slider.data('slider-dots');
        let slideDotsClass = $slider.data('slider-dots-class');
        let slideArrows = $slider.data('slider-arrows');
        let slideArrowsMobile = $slider.data('slider-arrows-mobile');
        let appendDots;
        let prevArrow = $($slider.find('.slider__arrow'))
        let nextArrow = $($slider.find('.slider__arrow.slider__arrow_reverse'))
        if (slideDots) {
            appendDots = $("."+slideDotsClass);
        } else {
            appendDots = "";
        }
        console.log(slideDotsClass);

        $slider.slick({
            slide: '.slider__slide',
            dots: slideDots,
            arrows: slideArrows,
            prevArrow: prevArrow,
            nextArrow: nextArrow,
            dotsClass: "'"+slideDotsClass+"'",
            appendDots: appendDots,
            slidesToShow: 1,
            customPaging: function(slider, i) {
                //you can reference the slider being instantiated as slider.$slider
                if (slideDots) {
                    var title = $(slider.$slides[i]).data('title');
                    return '<div class="slider__dot"> '+title+' </a>';
                }
            },
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                    arrows: slideArrowsMobile,
                  }
                },
            ]
        });
    })

    
    $('audio').audioPlayer({
        strPlay: 'Play',
        strPause: 'Pause',
        strVolume: 'Volume'
    });
    
    $('.audioplayer-playpause').on('click', function(e) {
        $('.audioplayer-playpause').not($(this)).each(function(index, el) {
            if ($(el).attr('title') === 'Pause') {
                $(el)
                .attr('title', "Play")
                .find('a')
                .text('Play');
                $(el)
                .closest('.audioplayer')
                .removeClass('audioplayer-playing')
                .addClass('audioplayer-stopped')
                .find('audio')
                .trigger('pause');
            }
        });
    });
});

mouseMoveParallax();

let wowOffset = ($(window).height() / 3).toFixed() * 1;
console.log(wowOffset);

var wow = new WOW(
    {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       wowOffset,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null,    // optional scroll container selector, otherwise use window,
        resetAnimation: false,     // reset animation on end (default is true)
    }
);

wow.init();

showModalVideo();

$(".js-video").each(function () {
    let video = $(this);
    console.log(video);
    let videoId = video.data('video-id');

    $.ajax({
        type:'GET',
        url: 'http://vimeo.com/api/v2/video/' + videoId + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(data){
            let thumbnailSrc = data[0].thumbnail_large;
            let videoWrapper = video.closest('.video__wrapper');

            videoWrapper.css('background-image', 'url('+thumbnailSrc+')');
        }
    });

    $(this).append($('<div class="video__play btn btn_theme_light"></div>'));        
    
    $('body').on('click', '.video__play', function () {
        let currentVideo = $(this).closest('.js-video');
        let id = currentVideo.attr('id');
        let videoId = currentVideo.data('video-id');
        let player = setPlayer(id, videoId);

        player.play();
        $(this).remove();
    })
})

function mouseMoveParallax() {
    let wrapper = $('.parallaxBox');
    let item = wrapper.find('.parallaxMouse');
    let speed = 0;
    let offsetX;
    let offsetY;
    let isXsWidth = $(window).width();
    
    wrapper.on('mousemove', function(even) {
        offsetX = -(even.clientX - $(window).width() / 2);
        offsetY = -(even.clientY - $(window).width() / 2);
        
        if (isXsWidth < 768) {
            item.removeAttr('style');
        } else {
            item.each(function(index, el) {
                speed = $(el).data('speed');
                $(el).attr('style', 'transform: translate3d('+(offsetX*speed/1000)+'em, '+(offsetY*speed/1000)+'em , 0)');
            });
        }

    });
    
    wrapper.on('mouseleave', function(even) {
        item.each(function(index, el) {
            speed = $(el).data('speed');
            $(el).attr('style', 'transform: translate3d(0, 0 , 0)');
        });
    });
}
    
function showModalVideo() {
    let videoModal = $('.js-video-modal');
    let id = videoModal.attr('id');
    let videoModalId = videoModal.data('video-id');
    let playerModal = setPlayer(id, videoModalId);

    $('#play').on('show.bs.modal', function() {
        playerModal.play();
    });

    $('#play').on('hide.bs.modal', function() {
        playerModal.pause();
    });
}

function setPlayer(id, videoId) {
    let options = {
        id: videoId,
        title: false,
    };

    return new Vimeo.Player(id, options);
}