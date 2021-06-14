export const replaceText = () => {
    const button = document.querySelector('.header__content-callback-btn');
    const caseHeadline = document.querySelector('.cases__headline');

    const checkRes = () => {
        if (window.matchMedia('(min-width: 768px)').matches) {
            button.textContent = 'Выйти на связь';
            caseHeadline.textContent = 'Кейсы говорят сами за себя';
        } else {
            button.textContent = 'Заказать звонок';
            caseHeadline.textContent = 'Наши кейсы';
        }
    }
    checkRes();

    window.addEventListener('resize', checkRes);
}