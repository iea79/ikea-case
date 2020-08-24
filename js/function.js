// $(document).ready(function(){
    $('.js-slider').slick({
        slide: '.slider__slide',
        // slidesToShow: 1,
        // slidesToScroll: 1,
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
            // return $('<button></button').text(slider.$slider.data('buttonlabel'));
        },
        responsive: [
            {
              breakpoint: 767,
              settings: {
                arrows: false,
                // variableWidth: true,
              }
            },
        ]
    });
// });
function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 1200) {
    	var fontSize = windowWidth/19.05;
    } else if (windowWidth < 1200) {
    	var fontSize = 60;
    }
	$('body').css('fontSize', fontSize + '%');
}

// Видео youtube для страницы
function uploadYoutubeVideo() {
    if ($(".js-youtube")) {

        $(".js-youtube").each(function () {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
            $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

        });

        $('.video__play, .video__prev').on('click', function () {
            // создаем iframe со включенной опцией autoplay
            let wrapp = $(this).closest('.js-youtube'),
                videoId = wrapp.attr('id'),
                iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";

            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            let iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
            })

            // Заменяем миниатюру HTML5 плеером с YouTube
            $(this).closest('.video__wrapper').append(iframe);

        });
    }
};