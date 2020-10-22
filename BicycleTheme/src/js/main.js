import polyfillsInit from './modules/polyfills';
import sendMail from './modules/sendMail';
import slider from './modules/slider';
import menu from './modules/menu';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    polyfillsInit();
    slider();
    menu();
    sendMail();
})