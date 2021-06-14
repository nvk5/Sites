export const toggleMobileMenu = () => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.nav__list');

    burger.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
}

