import timer from './timer';
import setTabs from './tabs';
import sendMail from './sendMail';
import polyfillsInit from './polyfills';
import video from './video';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    polyfillsInit();
    timer();
    setTabs();
    sendMail();
    video();
});
