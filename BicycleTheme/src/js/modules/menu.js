export const menu = () => {
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