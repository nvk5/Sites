import phoneIntlInit from './phone-intl';
import fakeSendForm from './fetch-fake';

window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    setTimeout(() => document.querySelector('.order-form').style.display = 'flex', 500);

    phoneIntlInit();
    fakeSendForm();
});