$(document).ready(function(){
    $('.js-slider').slick({
        slide: '.slider__slide',
        dots: true,
        arrows: true,
        prevArrow: $('.slider__arrow'),
        nextArrow: $('.slider__arrow.slider__arrow_reverse'),
        dotsClass: 'slider__dots',
        appendDots: $('.slider__dots'),
        customPaging: function(slider, i) {
            //you can reference the slider being instantiated as slider.$slider
            var title = $(slider.$slides[i]).data('title');
            return '<div class="slider__dot"> '+title+' </a>';
        },
        responsive: [
            {
              breakpoint: 767,
              settings: {
                arrows: false,
              }
            },
        ]
    });
});

mouseMoveParallax();

function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 1200) {
    	var fontSize = windowWidth/19.05;
    } else if (windowWidth < 1200) {
    	var fontSize = 60;
    }
	$('body').css('fontSize', fontSize + '%');
}

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

// let wowOffset = ($(window).height() / 3).toFixed() * 1;
// console.log(wowOffset);
// var wow = new WOW(
//     {
//         boxClass:     'wow',      // animated element css class (default is wow)
//         animateClass: 'animated', // animation css class (default is animated)
//         offset:       wowOffset,          // distance to the element when triggering the animation (default is 0)
//         mobile:       true,       // trigger animations on mobile devices (default is true)
//         live:         true,       // act on asynchronously loaded content (default is true)
//         callback:     function(box) {
//             // the callback is fired every time an animation is started
//             // the argument that is passed in is the DOM node being animated
//         },
//         scrollContainer: null,    // optional scroll container selector, otherwise use window,
//         resetAnimation: false,     // reset animation on end (default is true)
//     }
// );

// wow.init();


// $('audio').audioPlayer({
//     strPlay: 'Play',
//     strPause: 'Pause',
//     strVolume: 'Volume'
// });

// $('.audioplayer-playpause').on('click', function(e) {
//     $('.audioplayer-playpause').not($(this)).each(function(index, el) {
//         if ($(el).attr('title') === 'Pause') {
//             $(el)
//                 .attr('title', "Play")
//                 .find('a')
//                 .text('Play');
//             $(el)
//                 .closest('.audioplayer')
//                 .removeClass('audioplayer-playing')
//                 .addClass('audioplayer-stopped')
//                 .find('audio')
//                 .trigger('pause');
//         }
//     });
// });


// // Видео youtube для страницы
// function uploadYoutubeVideo() {
//     if ($(".js-youtube")) {

//         $(".js-youtube").each(function () {
//             // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
//             $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

//             // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
//             $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

//         });

//         $('.video__play, .video__prev').on('click', function () {
//             // создаем iframe со включенной опцией autoplay
//             let wrapp = $(this).closest('.js-youtube'),
//                 videoId = wrapp.attr('id'),
//                 iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";

//             if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

//             // Высота и ширина iframe должны быть такими же, как и у родительского блока
//             let iframe = $('<iframe/>', {
//                 'frameborder': '0',
//                 'src': iframe_url,
//             })

//             // Заменяем миниатюру HTML5 плеером с YouTube
//             $(this).closest('.video__wrapper').append(iframe);

//         });
//     }
// };