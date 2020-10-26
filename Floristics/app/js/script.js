window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  //SVG for IE
  svg4everybody();

  //forEach polyfill
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  ////objectFit IE
  (function () {
    let images = document.querySelectorAll('img');
    images.forEach(item => item.style.fontFamily = "'object-fit: cover'");
    objectFitImages(images);
  }());


  ////scrollToSection
  (function () {
    let btnScroll = document.querySelector('.header-home__scroll-down');
    let viewCatalog = document.querySelector('.header-home .header-home__view-catalog');
    let services = document.querySelector('.services');

    if (document.querySelectorAll('.services').length > 0 || services != undefined) {
      viewCatalog.addEventListener('click', scrollTo);
      btnScroll.addEventListener('click', scrollTo);

      function scrollTo(event) {
        event.preventDefault();
        services.scrollIntoView({ behavior: "smooth" });
      }
    }
  }());


  ////toggleNav
  (function () {
    let burger = document.querySelector('.menu-btn');
    let closeBtn = document.querySelector('.close-btn');
    let nav = document.querySelector('.nav');
    let body = document.body;

    burger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    function openMenu() {
      nav.classList.add('show');
      nav.style.display = 'block';
      body.classList.add('body-scrollbar');
      setTimeout(() => {
        nav.classList.remove('show');
      }, 400);
    }

    function closeMenu() {
      body.classList.remove('body-scrollbar');
      nav.classList.add('hide');
      setTimeout(() => {
        nav.style.display = 'none';
        nav.classList.remove('hide');
      }, 400);
    }

  })();

  //toggleModalWindow
  (function () {
    let order = document.querySelector('.view--order');
    let modal = document.querySelector('.modal');
    let close = document.querySelector('.modal .close-btn');
    let input = document.querySelectorAll('.form__input');

    order.addEventListener('click', function () {
      modal.classList.add('show');
      modal.classList.add('ordered');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        modal.classList.remove('show');
      }, 400);
    });

    close.addEventListener('click', function () {
      modal.classList.add('hide');
      document.body.style.overflow = '';
      setTimeout(() => {
        modal.classList.remove('ordered');
        modal.classList.remove('hide');
        input.forEach((item) => {
          item.value = '';
        });
      }, 400);
    });

  }());


  ////sendMail
  (function () {
    let form = document.querySelector('.form');
    let modalSuccess = document.querySelector('.modal__success');

    form.addEventListener('submit', event => {
      event.preventDefault();
      let formData = new FormData(this);
      formData = Object.fromEntries(formData);
      ajaxSend(formData);
    });

    const ajaxSend = async formData => {
      try {
        const response = await fetch('mail.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          modalSuccess.classList.add('show');
          modalSuccess.classList.add('sent');
          document.querySelectorAll('.form__input-wrap').forEach(item => {
            item.children[0].value = '';
          });
          setTimeout(() => {
            modalSuccess.classList.remove('show');
            modalSuccess.classList.add('hide');
            modalSuccess.classList.remove('sent');
          }, 3000);
        }
      }
      catch (error) {
        alert(error);
      }
    };
  }());



  ////sliderInit - home
  (function () {
    let container = document.querySelectorAll('.services-slider');

    if (container.length > 0) {
      let slider = tns({
        container: '.services-slider',
        items: 1,
        slideBy: 1,
        rewind: true,
        arrowKeys: true,
        animateIn: 'tns-fadeIn',
        mouseDrag: true,
        nav: true,
        navPosition: 'bottom',
        controls: false,
        responsive: {
          768: {
            items: 4,
            disable: true
          },
          576: {
            items: 2,
            slideBy: 2
          },

        }
      });
    }

  }());



  ////sliderInit
  (function () {
    let container = document.querySelectorAll('.header__slider');

    if (container.length > 0) {
      let slider = tns({
        container: '.header__slider',
        items: 1,
        slideBy: 1,
        mode: 'gallery',
        arrowKeys: true,
        speed: 1000,
        navContainer: '.slider-thumbs',
        navAsThumbnails: true,
        prevButton: '.header__slider--prev',
        nextButton: '.header__slider--next',
        loop: false,
        mouseDrag: true,
        autoHeight: false
      });

      let sliderThumbs = tns({
        container: '.slider-thumbs',
        items: 4,
        slideBy: 1,
        arrowKeys: true,
        nav: false,
        prevButton: '.header__slider--prev',
        nextButton: '.header__slider--next',
        loop: false,
        mouseDrag: true,
      });


      let prev = document.querySelector('.header__slider--prev');
      let next = document.querySelector('.header__slider--next');

      prev.style.display = 'none';
      next.addEventListener('click', event => {
        if (event.type) {
          prev.style.display = '';
        }
      });
    }

  }());


  ////setSliderHeight
  (function(){
    window.addEventListener('load', function(){
      let target = document.querySelectorAll('.header__slider-wrap');
      let targetHeight = document.querySelector('.header__slider-img');
      let sm = window.matchMedia('(min-width: 992px)');

      function setEqualHeight() {
        [...target].filter((item,i) => i !== 0).forEach(item => item.style.height = `${targetHeight.clientHeight}px`);
      }
      function removeEqualHeight() {
        [...target].filter((item,i) => i !== 0).forEach(item => item.style.height = `auto`);
      }
      
      function setFunc() {
        target && sm.matches ? setEqualHeight() : removeEqualHeight();
      }
      setFunc();

      window.addEventListener('resize', setFunc)
    })
  }())

});