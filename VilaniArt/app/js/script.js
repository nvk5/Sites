window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  //forEach polyfill
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  svg4everybody();

  //Lazyloading
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

  
  function toggleMenu(){
    var burger = $('.header__hamburger');
    var burgerItem = $('.hamburger__line');
    var overlay = $('.site-overlay');

    $(document).on('click', [burger, overlay],  function(event){
      burger.toggleClass('cross');
      burgerItem.toggleClass('toggle');
    });
  }
  toggleMenu();

  

  //Slick slider для хедера
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


  // $(".projects__content").not(":first").hide();

  // $(".projects__item").click(function (event) {
  //     $(".projects__block").hide().eq($(this).index()).fadeIn();
  // });

  // Установка табов блока projects
  function getTabs() {
    const links = document.querySelectorAll('.projects__link'),
      linksParent = document.querySelector('.projects__list'),
      content = document.querySelectorAll('.projects__block');

    function hideContent(num = 1) {
      for (let i = num; i < content.length; i++) {
        content[i].classList.remove('show');
        content[i].classList.add('hide');
      }
    }
    hideContent();

    function showContent(contentNum) {
      if (content[contentNum].classList.contains('hide')) {
        content[contentNum].classList.remove('hide');
        content[contentNum].classList.add('show');
      }
    }

    linksParent.addEventListener('click', function (e) {
      if (e.target.classList.contains('projects__link') || event.target) {
        for (let i = 0; i < links.length; i++) {
          if (e.target == links[i]) {
            e.preventDefault();
            hideContent(0);
            showContent(i);
            break;
          }
        }
      }
    });

  }
  getTabs();



 
  //Кнопка "прокрутить вверх" - показать / убрать
  $(window).scroll(function(){
    if ( $(this).scrollTop() > $(this).height() ) {
      $('.arrow').addClass('arrow__active');
    } else {
      $('.arrow').removeClass('arrow__active');
    }
  });

  //Прокрутка к началу документа
  $('.arrow').click(function(){
    $('html, body').stop().animate({
      scrollTop: 0
    },'slow','swing');
  });

  $(document).pjax('.nav__link', '.logo', '.pjax-container', {
    fragment: '.pjax-container'
  });

  //  Ajax отправка формы
  $(document).ready(function() {
    $(".form").submit(function() { 
      var form = $(this);
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
    });
  });

  var cleave = new Cleave('input[type="tel"]', {
    phone: true,
    phoneRegionCode: 'RU'
});


});