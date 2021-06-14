import { setClientSlider } from './clients';
import { setFeatureTabs } from './features-tabs';
import { toggleMobileMenu } from './mobile-nav';
import { replaceText } from './text-replace';
import { setWorkSectionTabs } from './work-section';

window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    toggleMobileMenu();
    replaceText();
    setWorkSectionTabs();
    setFeatureTabs();
    setClientSlider();
});