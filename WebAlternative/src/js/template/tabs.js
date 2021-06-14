export const tabs = ({ tabHeaderSelector, tabSelector, contentSelector, activeClassSelector, display } = {}) => {
    const header = document.querySelector(tabHeaderSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);

    function removeClassSelectorDot(classSelector) {
        return classSelector.replace(/\./, '');
    }

    const hideTabContent = () => {
        content.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
            item.style.display = 'none'
        });
        tab.forEach(item => item.classList.remove(removeClassSelectorDot(activeClassSelector)));
    }

    const showTabContent = (i = 2) => {
        content[i].classList.remove('hide');
        content[i].classList.add('show');
        content[i].style.display = display;
        tab[i].classList.add(removeClassSelectorDot(activeClassSelector));
    }

    const setTabs = event => {
        event.preventDefault();
        const closest = event.target.closest(tabSelector);

        tab.forEach((item, i) => {
            if (event.target && closest && event.target === item) {
                hideTabContent();
                showTabContent(i);
            }
        })
    }

    const resetTabs = () => {
        tab.forEach(item => item.classList.remove(removeClassSelectorDot(activeClassSelector)));
        content.forEach(item => item.style.display = 'grid');
    }

    hideTabContent();
    showTabContent();
    header.addEventListener('click', setTabs);

    return { resetTabs }
};
