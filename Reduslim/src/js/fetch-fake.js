import 'formdata-polyfill';

export default function () {
    const loader = document.querySelector('.loader');
    const resultField = document.querySelector('.form__submit-result');
    const form = document.forms[0];

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        const promise = new Promise((resolve) => {
            loader.style.display = 'flex';

            setTimeout(() => {
                resolve()
            }, 1000);
        })

        promise.then(() => {
            resultField.textContent = `${formData.get('name')}, спасибо за обратную связь, скоро мы с вами свяжемся!`;
        }).catch(err => {
            resultField.textContent = `Непредвиденная ошибка ${err}`;
        }).finally(() => {
            loader.style.display = 'none';
            resultField.style.display = 'block';
            form.reset();
        })
    })
}