window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //forEach polyfill
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }


    (function(){
        let img = document.querySelector('.header__details-img');
        let readMoreBtn = document.querySelector('.header__button');

        document.addEventListener('mouseover', function(e){
            if (e.target === img || e.target == readMoreBtn) {
                readMoreBtn.classList.add('active');
            }
        });

        document.addEventListener('mouseout', function(e){
            if (e.target === img || e.target == readMoreBtn) {
                readMoreBtn.classList.remove('active');
            }
        });

    }());

    (function(){
        let burger = document.querySelector('.burger');
        let nav = document.querySelector('.nav');

        burger.addEventListener('click', function(){
            this.classList.toggle('cross');
            nav.classList.toggle('fade');
        });
    }());

});