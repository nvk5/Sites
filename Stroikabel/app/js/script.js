$(function(){
    
    $(document).on('click', '.burger__wrap, .burger__desc', function(){
        $('.nav').slideToggle('600');
    });

    function toggleNavOnMatchMedia() {
        var query = window.matchMedia('(max-width: 991.98px)');

        if (query.matches) {
            $('.nav').css('display', 'none');
        } else {
            $('.nav').css('display', 'block');
        }
    }
    toggleNavOnMatchMedia();

    function toggleNavOnMatchMediaOnResize() {
        let flag = 1;
        $(window).on('resize', function () {
            if (window.matchMedia('(max-width: 991.98px)').matches && flag == 1) {
                $('.nav').css('display', 'none');
                flag = 2;
            }
            if (window.matchMedia('(min-width: 992px)').matches && flag == 2) {
                $('.nav').css('display', 'block');
                flag = 1;
            }
        });
    }
    toggleNavOnMatchMediaOnResize();


    $('.slider').slick({
        dots: true,
        fade: true,
        infinite: true,
        adaptiveHeight: true,
        prevArrow: '<img src="images/svg/back.svg" class="slider__arrow  slider__arrow--prev" alt="стрелка назад">',
        nextArrow: '<img src="images/svg/next.svg" class="slider__arrow  slider__arrow--next" alt="стрелка вперед">',
        responsive: [{
            breakpoint: 991.98,
            settings: {
                arrows: false
            }
        },
    ]
    });

    $('.slider-company').slick({
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        prevArrow: '<img src="images/svg/back-company.svg" class="slider__arrow slider__arrow--prev-company  slider__arrow--prev" alt="стрелка назад">',
        nextArrow: '<img src="images/svg/next-company.svg" class="slider__arrow slider__arrow--next-company  slider__arrow--next" alt="стрелка вперед">',
        responsive: [{
            breakpoint: 991.98,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767.98,
            settings: {
                slidesToShow: 1
            }
        }
    ]
    });

    $('.button').not('.form__btn').on('click', function(){
        $('.modal').fadeIn('600');
    });

    $('.form__close-icon').on('click', function(){
        $('.modal').fadeOut('600');
    });

    $('.form').on('submit', function(){
        var context = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php",
            data: context.serialize(),
        })
        .then(function(){
            $('.form__header').html('Спасибо! Ваша заявка принята в обработку!').addClass('success');
            setTimeout(function(){
                $('.form__header').html('Напишите Ваше имя и телефон и мы перезвоним в течении 15 минут').removeClass('success');
                context.trigger('reset');
            },3000);
        })
        .catch(function(err){
            console.log(err);
        });


        return false;
    });

});