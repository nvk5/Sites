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
                document.body.style.overflowY = 'auto';
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
        const ajaxSend = function(formData) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'mail.php');
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
            xhr.send(JSON.stringify(formData));
            const text = document.querySelector('.contact__text');
    
            text.textContent = 'Loading...'
    
            xhr.addEventListener('load', () => {
                if (xhr.status == 200) {
                    alert('Сообщение отправлено. Скоро мы с вами свяжемся!')
                } else {
                    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                }
            })
    
            xhr.addEventListener('error', () => alert('Ошибка соединения или неверный URL'))
    
            xhr.addEventListener('loadend', () => {
                text.textContent = 'Stay on the saddle!'
                this.reset();
            })
        }
    
        document.querySelectorAll('.form').forEach(form => {
            form.addEventListener('submit', function() {
                event.preventDefault();
                let formData = new FormData(this);
                let obj = {};
        
                for (let i = 0; i < formData.length; i++) {
                    obj[formData[i][0]] = obj[formData[i][1]];
                }
                
                ajaxSend.call(this, obj);
            })
        })
    }
})