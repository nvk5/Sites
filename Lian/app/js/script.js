$(function () {

    ////COMMON

    svg4everybody();
    objectFitImages();
    $('img').not('[src$="svg"]').css('font-family', "'object-fit: cover'");

    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });


    $('.preloader__wrap').fadeIn(2000, function(){
        $('.preloader').fadeOut(2000);
    });

    $(document).on('click', '.burger, .pushy__cancel', function () {
        $('body').toggleClass('pushy-open-right');
    });


    function menu() {
        let cancelBtn = $('<svg class="pushy__cancel"><use xlink:href="images/svg/sprite/sprite.svg#cancel"></use><svg>');
        let cloneLogo = $('a.logo').eq(0).clone().addClass('copy');
        let flag = 1;
    
        if (window.matchMedia('(max-width: 991.98px)').matches) {
            $('.nav__list').prepend(cancelBtn,cloneLogo);
        } 
    
        $(window).on('resize',function(){
            if (window.matchMedia('(max-width: 991.98px)').matches && flag === 1) { 
                if (!$('.pushy-content').find('.nav__list').children().eq(0).is('.pushy__cancel')) {
                    $('.nav__list').prepend(cancelBtn,cloneLogo);
                }
                flag = 2;
            }
    
            if (window.matchMedia('(min-width: 992px)').matches && flag === 2) {            
               $('.pushy-content').find('.nav__list').children().filter(':eq(0), :eq(1)').remove();
                flag = 1;
            }
        });
    }
    menu();


    $('.search-input').after('<button class="search-input-cancel"><svg class="search-input-cancel__icon"><use xlink:href="images/svg/sprite/sprite.svg#cancel"></use><svg></button>');

    $('.search-btn').on('click', function(){
        $('.search-input').addClass('slide');
        $('.search-input-cancel').fadeIn('slow');
    });
    
    $('.search-input-cancel').on('click', function(){
        $('.search-input').removeClass('slide').val('');
        $('.search-input-cancel').fadeOut('fast');
    });


    //// HOME

    $('.slider').slick({
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        prevArrow: '<svg class="slider__arrow  slider__arrow--left"><use class="slider__arrow-icon-left" xlink:href="images/svg/sprite/sprite.svg#arrow-left"></use></svg>',
        nextArrow: '<svg class="slider__arrow  slider__arrow--right"><use class="slider__arrow-icon-right" xlink:href="images/svg/sprite/sprite.svg#arrow-right"></use></svg>',
        responsive: [{
            breakpoint: 479.98,
            settings: {
                arrows: false
            }
        }]
    });



    //// ABOUT

    function setInputRangeValue() {
        let range = $('.input-range');
        let progress = $('.about__input-progress');
    
        range.each(function(i,elem){
            progress[i].style.left = $(this).val() + '%';
        });
    
        $('.input-range').on('input change', function () {
            let index = range.index($(this));
            let currentVal = $(this).val() + '%';
    
            progress[index].style.left = $(this).val() + '%';
            progress.each(function (i, elem) {
                if (i == index) {
                    progress[i].innerHTML = currentVal;
                }
            });
        });
    }
    setInputRangeValue();




    ////HOME, PORTFOLIO

    function relocateProjectItems() {
        let query = window.matchMedia('(max-width: 767.98px)');

        if (query.matches) {
            $('.projects__content').hide();

            $('.projects__item').each(function (i, elem) {
                let contentItem = $('.projects__content').eq(i);
                $(elem).append(contentItem);
            });

            $('.projects__item').on('click', function (event) {
                $(this).find('.projects__content').slideToggle('slow');
            });

        } else {
            $(".projects__content").not(":first").hide();

            $(".projects__item").click(function (event) {
                $(".projects__content").hide().eq($(this).index()).fadeIn();
            });
        }
    }
    relocateProjectItems();

    function relocateProjectItemsOnResize() {
        let flag = 1;
        $(window).on('resize', function () {
            if (window.matchMedia('(max-width: 767.98px)').matches && flag == 1) {
                $('.projects__content').hide();

                $('.projects__item')
                    .off('click') 
                    .each(function (i, elem) {
                        let contentItem = $('.projects__content').eq(i);
                        $(elem).append(contentItem); 
                    })
                    .on('click', function (event) { //новый обработчик 
                        $(this).find('.projects__content').slideToggle('slow');
                    });

                flag = 2;
            }

            if (window.matchMedia('(min-width: 768px)').matches && flag == 2) {
                $('.projects__content')
                    .each(function (i, elem) {
                        $('.projects__container').append(elem);
                    })
                    .show()
                    .not(":first").hide();

                $(".projects__item")
                    .off('click') 
                    .click(function (event) { 
                        $(".projects__content").hide().eq($(this).index()).fadeIn();
                    });

                flag = 1;
            }
        });
    }
    relocateProjectItemsOnResize();


    function getMoreContent(){
        let counter = 0;
        let next = 5;
        let random = [80, 150, 120];
        function getRandomInt(min,max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    
    $('.load-more-btn').on('click', function () {
        let index = $('.load-more-btn').index($(this));
        let parentGrid = $('.projects-grid').eq(index);

        $('.load-more-btn').html('Loading...');
    
        $.ajax({
                type: "GET",
                url: "https://jsonplaceholder.typicode.com/photos",
                dataType: "json"
            })
            .done(function(result){
                $('.load-more-btn').html('Load more');
                for (let i = counter; i < next; i++) {
                    $('<a>', {
                        href: 'portfolio-details.html',
                        title: 'project',
                        class: 'projects-grid__item link fadeIn',
                        html: `<div class="projects-grid__item-layer"></div><img class="img" src="${result[i].url}">`,
                    }).css('padding-top', random[getRandomInt(0, random.length - 1)] + '%').appendTo(parentGrid);
                }
    
                counter = counter + 5;
                next = next + 5;
            })
            .fail(function(err){
                $('.load-more-btn').html('Load more');
                alert(`Can not get ${this.url}`);
            });

            return false;
    });
    }
    getMoreContent();



    ////PORTFOLIO-DETAILS
    $('.project-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        prevArrow: $('.project-btns__item--prev'),
        nextArrow: $('.project-btns__item--next'),
        asNavFor: '.project-slider-thumb, .project-details-slider'
    });
    
        $('.project-slider-thumb').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.project-slider, .project-details-slider',
        dots: false,
        fade: false,
        autoplay: true,
        prevArrow: $('.project-btns__item--prev'),
        nextArrow: $('.project-btns__item--next'),
    });
    
        $('.project-details-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        prevArrow: $('.project-btns__item--prev'),
        nextArrow: $('.project-btns__item--next'),
        asNavFor: '.project-slider-thumb, .project-slider'
    });

    //// BLOG
    function videoInit() {
        const videoEl = document.querySelector('.blog__video'),
          playBtn = document.querySelector('.blog__img-play');
    
        playBtn.addEventListener('click', function () {
          if (videoEl.paused) {
            videoEl.play();
            playBtn.style.display = 'none';
            videoEl.setAttribute('controls', 'controls');
          } else {
            videoEl.pause();
            playBtn.style.display = 'block';
          }
        }, false);
    
        videoEl.addEventListener('play', function () {
          playBtn.style.display = 'none';
        }, false);
    
        videoEl.addEventListener('pause', function () {
          playBtn.style.display = 'block';
        }, false);
    
        videoEl.addEventListener('ended', function () {
          videoEl.load();
          videoEl.removeAttribute('controls');
        }, false);
      }
      videoInit();
    
      function sidebarSlide() {
        $('.sidebar__headline').on('click', function () {
          let head = $('.sidebar__headline');
          $('.sidebar__block-wrap').eq(head.index($(this))).slideToggle('slow');
        });
      }
      sidebarSlide();
    
    
      function bgWebpCheck() {
        let query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)";
    
        Modernizr.on('webp', function () {
          if (matchMedia(query).matches) {
            // do high-dpi stuff
            let videoPath = $('.blog__video').attr('data-poster').replace(/1x/, '2x').replace(/@[12]x/, '$&/webp').replace(/png|jpg/, 'webp');
            $('.blog__video').attr('data-poster', videoPath);
    
            $('.sidebar__block-post').each(function (i, elem) {
              let newPath = $(this).attr('data-bg').replace(/1x/, '2x').replace(/@[12]x/, '$&/webp').replace(/png|jpg/, 'webp');
              $(this).attr('data-bg', newPath);
            });
    
          } else {
            // do non high-dpi stuff
            let videoPath = $('.blog__video').attr('data-poster').replace(/@[12]x/, '$&/webp').replace(/png|jpg/, 'webp');
            $('.blog__video').attr('data-poster', videoPath);
    
            $('.sidebar__block-post').each(function (i, elem) {
              let newPath = $(this).attr('data-bg').replace(/@[12]x/, '$&/webp').replace(/png|jpg/, 'webp');
              $(this).attr('data-bg', newPath);
            });
          }
        });
    
      }
      bgWebpCheck();
    
      $('.blog__video').parent().css('padding-top', '57%');
    
    
      function sidebarTabs() {
        $('.blog').not(':first').hide();
    
        $('.sidebar__list-link').on('click', function (event) {
          event.preventDefault();
          let currentIndex = $('.sidebar__list-link').index($(this));
    
          $('.blog').hide().eq(currentIndex).fadeIn('slow');
          $('html, body').animate({
            scrollTop: $('.blog').eq(currentIndex).offset().top
          }, 500);
          $('.sidebar__list-item').removeClass('active').eq(currentIndex).addClass('active');
        });
      }
      sidebarTabs();
    

    // CONTACT, SINGLE-POST


    $('form').on('submit', function(event){
        let context = $(this);
        
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: context.serialize()
        }).done(function(){
            $(context).find('.modal').addClass('active').css('display', 'flex').hide().fadeIn();
            setTimeout(function(){
                $(context).find('.modal').removeClass('active').fadeOut();
                context.trigger('reset');
            },3000);
        });
           
        return false;
    });
    
    
    
    // CONTACT

    $(window).on('scroll', function(){
        let th = $(this).scrollTop();
        let mapWrap = $('.contact-map__wrap');

        if (th > 20) { 
            mapWrap.append('<iframe class="contact-map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3026.5870734444266!2d-73.8038992!3d40.6610319!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2671aa27f068f%3A0x445d1a3a7a3329cf!2sJfk%20Training%20Center!5e0!3m2!1sen!2sru!4v1582342248500!5m2!1sen!2sru" width="100%" height="365px" frameborder="0" style="border:0;" allowfullscreen=""></iframe>');
            $(this).off('scroll');
        }
    });

});