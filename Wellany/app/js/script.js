window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  //forEach polyfill
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  //SVG for IE
  svg4everybody();

  //Lazyloading
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

  //По завершению загрузки страницы через 1сек прелоадер исчезает
  $('.preload').delay(1000).fadeOut('slow');



  //Плавный скролл с прелоадером
  $('.nav__link, .header__logo').click(function () {
    var offset = $('.header__top').innerHeight();
    var target = $(this).attr('href');

    //отменяем переход к якорям по умолчанию
    event.preventDefault();

    //Выпускаем плавный прелоадер. 
    $('.preload').fadeIn('slow');

    // Через 0.6сек(нужно значение больше 0.5 - чтобы был эффект имитации загрузки новой страницы, 
    // и не было видно прокрутки перед появлением прелоадера) запустится анимация скролла к якорям. 
    // По завершению скролла (колбэк): возвращаем поле поиска, гамбургер и меню в дефолтное состояние. Также прелоадер исчезает
    setTimeout(() => {
      $('html, body').animate({
        scrollTop: $(target).offset().top - offset
      }, 500, function () {
        $('.header__hamburger').removeClass('cross');
        $('.header__search').removeClass('show');
        $('.header__search').addClass('hide');
        $('.preload').fadeOut('slow');
      });
    }, 500);

    $('.nav__link').removeClass('active');
    $(this).addClass('active');
  });

  //Slick slider для хедера
  $('.header__slider').slick({
    autoplay: true,
    infinite: true,
    fade: true,
    dots: true,
    useCSS: false,
    prevArrow: '<svg class="header__arrow slick-arrow slick-arrow--left"><use xlink:href="img/svg/sprite/sprite.svg#left-arrow-angle"></use></svg>',
    nextArrow: '<svg class="header__arrow slick-arrow slick-arrow--right"><use xlink:href="img/svg/sprite/sprite.svg#right-arrow-angle"></use></svg>',
    responsive: [{
        breakpoint: 767.98,
        settings: {
          arrows: false
        }
      },
      {
        breakpoint: 575.98,
        settings: {
          arrows: false,
        }
      }
    ]
  });

  //Slick slider для блока постов
  $('.posts__slider').slick({
    centerMode: true,
    centerPadding: '0px',
    initialSlide: 1,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    prevArrow: '<svg class="posts__arrows posts__arrows--prev"><use xlink:href="img/svg/sprite/sprite.svg#arrow-posts-left"></use></svg>',
    nextArrow: '<svg class="posts__arrows posts__arrows--next"><use xlink:href="img/svg/sprite/sprite.svg#arrow-posts-right"></use></svg>',
    responsive: [{
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          dots: false
        }
      },
      {
        breakpoint: 991.98,
        settings: {
          dots: false,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767.98,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      },
      {
        breakpoint: 575.98,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      },
    ]
  });

  //Кнопка листать вверх
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(this).height()) {
      $('.arrow').addClass('arrow__active');
    } else {
      $('.arrow').removeClass('arrow__active');
    }
  });

  $('.arrow').click(function () {
    $('html, body').stop().animate({
      scrollTop: 0
    }, 'slow', 'swing');
  });

  //Тугл бургера, установка цвета фикс. шапки при клике на бургер,
  //скрытие креста бургера при клике на оверлей
  function pushyMenu() {
    const headerTop = document.querySelector('.header__top');
    const burger = document.querySelector('.header__hamburger');
    const overlay = document.querySelector('.site-overlay');

    document.body.addEventListener('click', function (e) {
      if (burger.classList.contains('cross') && e.target === overlay) {
        burger.classList.remove('cross');
      }
    });

    burger.addEventListener('click', function () {
      headerTop.classList.add('header__top-color');
      this.classList.toggle('cross');
    });



  }
  pushyMenu();

  //Тугл поля поиска  при клике на кнопку поиска.
  function getSearch() {
    const searchBtn = document.querySelector('.search__link'),
      searchField = document.querySelector('.header__search');

    searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (searchField.classList.contains('hide')) {
        searchField.classList.remove('hide');
        searchField.classList.add('show');
      } else {
        searchField.classList.remove('show');
        searchField.classList.add('hide');
      }
    });
  }
  getSearch();


  // Смена цвета фиксированной шапки и меню при скролле
  function changeHeaderColor() {
    const headerTop = document.querySelector('.header__top');

    window.addEventListener('scroll', function () {
      if ((document.documentElement.scrollTop > 0 || window.pageYOffset > 0) || document.body.classList.contains('pushy-open-left')) {
        headerTop.classList.add('header__top-color');
      } else {
        headerTop.classList.remove('header__top-color');
      }
    });
  }
  changeHeaderColor();

  //Установка модального окна формы обратной связи
  function toggleForm() {
    const closeBtn = document.querySelector('.form__close'),
      modal = document.querySelector('.modal'),
      start = document.querySelector('.header__content-btn'),
      purchase = document.querySelector('.purchase__btn');

    document.body.addEventListener('click', function (e) {
      if (e.target == start || e.target == purchase) {
        modal.classList.add('fade');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          modal.classList.remove('fadeOut');
          modal.style.display = 'flex';
        }, 100);
      }
    });

    closeBtn.addEventListener('click', function () {
      modal.classList.add('fadeOut');
      document.body.style.overflow = '';
      setTimeout(() => {
        modal.classList.remove('fade');
        modal.style.display = 'none';
      }, 2500);
    });
  }
  toggleForm();

  //Установка табов блока projects
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

  //Открытие табов по кнопке load more
  function getHiddenTabs() {
    const btn = document.querySelectorAll('.projects__btn'),
      projectsHidden = document.querySelectorAll('.projects__load'),
      parent = document.querySelector('.projects');

    function hideContent(num = 1) {
      for (let i = num; i < projectsHidden.length; i++) {
        projectsHidden[i].classList.remove('show');
        projectsHidden[i].classList.add('hide');
      }
    }
    hideContent();

    function showContent(contentNum) {
      if (projectsHidden[contentNum].classList.contains('hide')) {
        projectsHidden[contentNum].classList.remove('hide');
        projectsHidden[contentNum].classList.add('show');
      }
    }

    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', function (e) {
        if (e.target == btn[i]) {
          e.preventDefault();
          hideContent(0);
          showContent(i);
        }
      });
    }
  }
  getHiddenTabs();


  //Замена формата изображений на WebP(название и путь должен быть одинаковый)
  function webpCheck() {
    const presentationBg = document.querySelector('.presentation__video'),
      partners = document.querySelector('.partners'),
      projectsImg = document.querySelectorAll('.projects-block__img'),
      articleImg = document.querySelectorAll('.article__img');

    Modernizr.on('webp', function (result) {
      if (result) {
        // supported
        presentationBg.setAttribute('data-poster', "img/@1x/webp/pres.webp");
        partners.setAttribute('data-bg', 'img/@1x/webp/partners.webp');

        for (let i = 0; i < projectsImg.length; i++) {
          let newPath = projectsImg[i].getAttribute('data-bg').replace(/@[12]x/, '$&/webp').replace(/png|jpg/, "webp");
          projectsImg[i].setAttribute('data-bg', newPath);
        }

        for (let i = 0; i < articleImg.length; i++) {
          let newPath = articleImg[i].getAttribute('data-bg').replace(/@[12]x/, '$&/webp').replace(/png|jpg/, "webp");
          articleImg[i].setAttribute('data-bg', newPath);
        }
      }
    });
  }
  webpCheck();

  //Минимальная настройка видео
  function videoInit() {
    const videoEl = document.querySelector('.presentation__video'),
      playBtn = document.getElementById('playBtn'),
      inner = document.querySelector('.presentation__inner'),
      overlay = document.querySelector('.presentation__overlay');

    playBtn.addEventListener('click', function () {
      if (videoEl.paused) {
        videoEl.play();
        overlay.style.display = 'none';
        videoEl.setAttribute('controls', 'controls');
        inner.style.display = 'none';
      } else {
        videoEl.pause();
        overlay.style.display = 'block';
        inner.style.display = 'block';
      }
    }, false);

    videoEl.addEventListener('ended', function () {
      videoEl.load();
      overlay.style.display = 'block';
      videoEl.removeAttribute('controls');
      inner.style.display = 'block';
    }, false);
  }
  videoInit();

  //Ajax отправка формы
  $(document).ready(function () {
    //E-mail Ajax Send
    $(".modal__header").submit(function () { 
      var th = $(this);
      $.ajax({
        type: "POST",
        url: "mail.php", 
        data: th.serialize()
      }).done(function () {
        $(th).find('.modal__success').addClass('modal__active').css('display', 'flex').hide().fadeIn();
        setTimeout(function () {
          // Done Functions
          $(th).find('.modal__success').removeClass('modal__active').fadeOut();
          th.trigger("reset");
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