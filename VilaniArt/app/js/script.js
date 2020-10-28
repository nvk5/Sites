window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //forEach polyfill
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  svg4everybody();

  //Lazyloading
  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

  //toggleMenu
  $(document).on('click', '.close-menu', function () {
    $('body').toggleClass('pushy-open-right');
  });

  
  //Slick slider header
  $('.header__slider').slick({
    fade: true,
    dots: false,
    // useCSS: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-nav',
    prevArrow: '<svg class="header__slick-arrow header__slick-arrow--left"><use xlink:href="img/svg/sprite/sprite.svg#left arrow"></use></svg>',
    nextArrow: '<svg class="header__slick-arrow header__slick-arrow--right"><use xlink:href="img/svg/sprite/sprite.svg#right arrow"></use></svg>',
  });

  $('.slider-nav').slick({
    infinite: true,
    autoplay: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    asNavFor: '.header__slider',
    dots: false,
    arrows: false,
    // centerMode: true,
    focusOnSelect: true,
    responsive: [{
        breakpoint: 991.98,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 767.98,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 575.98,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });


  ////Tabs
  $(".projects__block").not(":first").hide();
  $('.projects__item').on('click', function(i,elem){
    $(".projects__block").hide().eq($(this).index()).fadeIn('fast');
    return false;
  })
 
  //toggle scrollTop btn
  $(window).on('scroll', function(){
    if ( $(this).scrollTop() > $(this).height() ) {
      $('.arrow').addClass('arrow__active');
    } else {
      $('.arrow').removeClass('arrow__active');
    }
  })

  //Scroll to top
  $('.arrow').on('click', function(){
    $('html, body').stop().animate({
      scrollTop: 0
    },'slow','swing');
  })

  $(document).pjax('.nav__link', '.logo', '.pjax-container', {
    fragment: '.pjax-container'
  });


  //Ajax
  $(".form").on('submit', function(){
    const form = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", 
      data: form.serialize()
    }).done(function() {
      $(form).find('.modal__success').addClass('modal__active').css('display', 'flex').hide().fadeIn();
      setTimeout(function() {
        // Done Functions
        $(form).find('.modal__success').removeClass('modal__active').fadeOut();
        form.trigger("reset");
      }, 3000);
    });
    return false;
  })

////set href. Magnific popup needs a href attribute in order to work.
$('.projects__img').on('load', function(){
  $('.projects__block').not(':hidden').each(function(i,elem){
    const source = this.querySelectorAll('.projects__img');
    
    $(this).find('.projects__block-link').each(function(index,elem){
      $(elem).attr('href', function(){
        return source[index].currentSrc;
      })
    })
  })
})

////Magnific popup init
$('.projects__block').each(function(){
  $(this).magnificPopup({
    type: 'image',
    delegate: 'a',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true
    }
  })
})

});