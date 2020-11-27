window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    import('./modules/polyfills').then(({ polyfillsInit }) => polyfillsInit());
    import('./modules/slider').then(({ slider }) => slider());
    import('./modules/menu').then(({menu}) => menu());
    import('./modules/sendMail').then(({sendMail}) => sendMail());
})