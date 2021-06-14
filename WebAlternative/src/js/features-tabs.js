import { tabs } from "./template/tabs"

export const setFeatureTabs = () => {
    const featureTabSettings = {
        tabHeaderSelector: '.features__tabs',
        tabSelector: '.features__tabs-item',
        contentSelector: '.features__block',
        activeClassSelector: '.active',
        display: 'grid',
    }

    const checkRes = () => {
        if (window.matchMedia('(min-width: 768px)').matches) {
            tabs(featureTabSettings);
        } else {
            tabs(featureTabSettings).resetTabs();
        }
    }
    checkRes();

    window.addEventListener('resize', checkRes);
}