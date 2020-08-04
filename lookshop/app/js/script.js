$(function () {

    //Common

    //SVG IE
    svg4everybody();


    //ObjectFitImages IE
    objectFitImages();
    $('img').not('[src$="svg"]').css('font-family', "'object-fit: cover'");


    $('.purchase__card, .header__top-value, .products__sort, .single-product__size').selectize();


    function menu(){
        $('.nav__item').on('mouseenter', function(){
            $(this).addClass('open').find('.nav__inner').slideDown();
        });
        $('.nav__item').on('mouseleave', function(){
            $(this).removeClass('open').find('.nav__inner').slideUp();
        });
    }
    menu()

    function mobileMenu() {
        $('.burger--header').on('click', function () {
            $(this).toggleClass('cross');
            $('.nav__list').slideToggle('slow').css('display', 'block');
        });

        $('.burger--footer').on('click', function () {
            $(this).toggleClass('cross');
            $('.footer__bottom-list').slideToggle().css('display', 'flex');
            $('html, body').animate({
                scrollTop: $('.footer__bottom-list').offset().top
            }, 500);
        });

        //Top menu resize
        (function () {
            var flag = 1;
            $(window).on('resize', function () {
                if (window.matchMedia('(min-width: 992px)').matches && flag === 1) {
                    flag = 2;
                    $('.nav__list').css('display', 'flex');
                    $('.burger--header').removeClass('cross');
                }
                if (window.matchMedia('(max-width: 991.98px)').matches && flag === 2) {
                    flag = 1;
                    $('.nav__list').hide();
                    $('.burger--header').show();
                }
            });
        }());


        //Bottom menu resize
        (function () {
            var flag2 = 1;
            $(window).on('resize', function () {
                if (window.matchMedia('(min-width: 768px)').matches && flag2 === 1) {
                    $('.footer__bottom-list').css('display', 'flex');
                    $('.burger--footer').removeClass('cross');
                    flag2 = 2;
                }
                if (window.matchMedia('(max-width: 767.98px)').matches && flag2 === 2) {
                    $('.footer__bottom-list').hide();
                    $('.burger--header').show();
                    flag2 = 1;
                }
            });
        }());
    }
    mobileMenu();


    //SetEqualCardsHeight
    (function () {
        let cards = [...document.querySelectorAll('.card__details')].filter(item => !item.closest('.sidebar'));

        function heightArr(cards){
            let cardHeights = [];
            cards.forEach((item) => cardHeights.push(item.offsetHeight));
            return cardHeights;
        }

        function getMaxHeight(fn){
            return Math.max(...fn);
        }

        function setEqualHeight(target){
            let max = getMaxHeight(heightArr(target));
            target.forEach(item => item.style.minHeight = `${max}px`);
        }
        setEqualHeight(cards);

        window.addEventListener('resize', () => {
            setEqualHeight(cards);
        });
    }());


    /////////////Index

    $('.slider__wrap').slick({
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        //autoplay: true,
        prevArrow: '<button class="slider__arrow slider__arrow--left"></button>',
        nextArrow: '<button class="slider__arrow slider__arrow--right"></button>',
        responsive: [{
            breakpoint: 479.98,
            settings: {
                arrows: false
            }
        }]
    });


    $('.slider-product__tab').each(function () {
        $(this).slick({
            dots: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '170px',
            // variableWidth: true,
            adaptiveHeight: true,
            responsive: [{
                    breakpoint: 1199.98,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 991.98,
                    settings: {
                        slidesToShow: 3,
                        centerPadding: '0px'
                    }
                },
                {
                    breakpoint: 767.98,
                    settings: {
                        slidesToShow: 2,
                        centerPadding: '0px',
                        arrows: false
                    }
                }
            ]
        });
    });

    //Tabs
    $('.slider-product__tab').not(':first').addClass('tab-content-not-active');
    $('.slider-product__list-item').on('click', function () {
        $('.slider-product__list-item').removeClass('tab-active').eq($(this).index()).addClass('tab-active');
        $('.slider-product__tab')
            .addClass('tab-content-not-active').css('opacity', 0)
            .eq($(this).index()).removeClass('tab-content-not-active')
            .addClass('tab-content-active').animate({
                opacity: 1,
            }, 500);
    }).eq(0).addClass('tab-active');


  

    /////////Products.html

    $('.container--slider-clothes').slick({
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        prevArrow: '<button class="slider-clothes__arrow slider-clothes__arrow--left">previous</button>',
        nextArrow: '<button class="slider-clothes__arrow slider-clothes__arrow--right">next</button>',
    });

    $('input[type="range"]').on('input', function(){
        $('.max').html($(this).val());
    });

    $('.sidebar__size-select-item').on('click', function(){
        $('.sidebar__size-select-item').removeClass('active').eq($(this).index()).addClass('active');
    });


    
    ////////////Single-product.html

    $('.single-product__main-thumb').find('img').on('click', function(){
        $('.single-product__main').find('img').attr('src', $(this).data('full'));
    });

    (function(){
        var counter = $('.counter').html();

        $('.add').on('click', function(){
            $('.counter').html(++counter);
        });

        $('.delete').on('click', function(){
            $('.counter').html(--counter);
            if (counter < 1) {
                counter = 1;
                $('.counter').html('1');
            }
        });
    }());

});