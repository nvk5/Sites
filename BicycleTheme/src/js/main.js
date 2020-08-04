import smoothscroll from 'smoothscroll-polyfill';
import objectFitImages from 'object-fit-images';
import Glide from '@glidejs/glide';


window.addEventListener('DOMContentLoaded', () => {
    'use strict';

      //forEach polyfill
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    smoothscroll.polyfill();

    new Glide('.glide', {
        type: 'carousel'
    }).mount();


   

    {
        const images = document.querySelectorAll('img:not([src$=".svg"])');
        images.forEach(item => item.style.fontFamily = "'object-fit: cover'");
        objectFitImages(images);
        
        // const images = document.querySelectorAll('img');
        // [...images].filter(item => {
        //     return !item.getAttribute('src').includes('svg');
        // }).forEach(item => item.style.fontFamily = "'object-fit: cover'")
        // // images.forEach(item => item.style.fontFamily = "'object-fit: cover'");
        // objectFitImages(images);
    }

    {
        const navLinks = document.querySelectorAll('.nav__link');
        const menu = document.querySelector('.nav');
        const closeMenubtn = document.querySelector('.close');
        const openMenuBtn = document.querySelector('.burger');
        let flag = 1;

        window.addEventListener('resize', () => {

            if (window.matchMedia('(min-width: 768px)').matches && flag == 1 ) {
                closeMenubtn.style.display = 'none';
                menu.style.display = 'block';
                flag = 2;
            }
            if (window.matchMedia('(max-width: 767.98px)').matches && flag == 2 ) {
                menu.style.display = 'none';
                flag = 1;
            } 
        });

        const openMenu = () => {
            document.body.style.overflowY = 'hidden';
            menu.classList.add('show');
            menu.style.display = 'block';
            closeMenubtn.style.display = 'block';
            setTimeout(() => {
                menu.classList.remove('show');
            },400);
        }

        const closeMenu = () => {
            document.body.style.overflowY = 'auto';
            menu.classList.add('hide');
            closeMenubtn.style.display = 'none';
            setTimeout(() => {
                menu.style.display = 'none';
                menu.classList.remove('hide');
            },400);
        }

        openMenuBtn.addEventListener('click', openMenu);
        closeMenubtn.addEventListener('click', closeMenu);


        navLinks.forEach(item => item.addEventListener('click', (event) => {
            event.preventDefault();
            const href = item.getAttribute('href');
            const target = document.querySelector(href);
            
            if ( window.matchMedia('(max-width: 767.98px)').matches && event.type) {
                closeMenu();
            } 

            target.scrollIntoView({
                behavior: 'smooth'
            })
        }));
    }


    {
        const form = document.querySelector('.form');
        const success = document.querySelector('.contact > span');

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
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    success.innerHTML = 'Success!'
                    document.querySelectorAll('.form__input').forEach(item => {
                        item.value = '';
                    });
                    setTimeout(() => {
                        success.innerHTML = 'Stay on the saddle!'
                    }, 3000);
                }
            }
            catch (error) {
                alert(error);
            }
        };
    }
       

})