export const accordion = ({ accordionHeaderSelector, accordionSelector, contentSelector, activeClassSelector }) => {
    const header = document.querySelector(accordionHeaderSelector);
    const accordion = document.querySelectorAll(accordionSelector);
    const content = document.querySelectorAll(contentSelector);

    function removeClassSelectorDot(classSelector) {
        return classSelector.replace(/\./, '');
    }

    const hideAccordionContent = (index) => {
        content.forEach((item, i) => {
            if (i !== index) {
                item.classList.remove('show');
                accordion[i].classList.remove(removeClassSelectorDot(activeClassSelector));
            }
        });
    }

    function toggleAccordionContent(index) {
        this.classList.toggle(removeClassSelectorDot(activeClassSelector));

        content[index].classList.toggle('show');
    }

    const setAccordion = event => {
        const closest = event.target.closest(accordionSelector);

        accordion.forEach((item, i) => {
            if (closest === item) {
                hideAccordionContent.call(item, i);
                toggleAccordionContent.call(item, i);
            }
        })
    }

    const handleClickOutside = (event) => {
        const closest = event.target.closest(accordionSelector);

        if (!closest) {
            content.forEach(item => item.classList.remove('show'));
            accordion.forEach(item => item.classList.remove(removeClassSelectorDot(activeClassSelector)));
        }
    }

    header.addEventListener('click', setAccordion);
    window.addEventListener('click', handleClickOutside);
};
