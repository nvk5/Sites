window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    import('./modules/polyfills').then(({ polyfillsInit }) => polyfillsInit());
    import('./libs/lazyload').then(({ lazyload }) => lazyload());
    import('./modules/slider').then(({ slider }) => slider());
    import('./modules/menu').then(({ menu }) => menu());
    import('./modules/sendMail').then(({ sendMail }) => sendMail());
})