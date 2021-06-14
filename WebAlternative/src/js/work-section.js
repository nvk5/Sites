import { accordion } from "./template/accordion";
import { modal } from "./template/modal";

const modalSettings = {
    parentSelector: '.work__list',
    targetSelector: '.work__button',
    overlaySelector: '.popup',
    closeBtnSelector: '.popup__close',
    display: 'flex',
}

const workListSettings = {
    accordionHeaderSelector: '.work__list',
    accordionSelector: '.work__button',
    contentSelector: '.work__item-text',
    activeClassSelector: '.active',
}

const setPopup = () => modal(modalSettings);
const toggleWorkListItem = () => accordion(workListSettings);

export const setWorkSectionTabs = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
        setPopup();
    } else {
        toggleWorkListItem();
    }
}