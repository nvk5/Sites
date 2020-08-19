export default function sendMail() {

    const ajaxSend = function(formData) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'mail.php');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        xhr.send(JSON.stringify(formData));

        this.querySelector('.success').classList.add('show');

        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                alert('Сообщение отправлено. Скоро мы с вами свяжемся!')
            } else {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            }
        })

        xhr.addEventListener('error', () => alert('Ошибка соединения или неверный URL'))

        xhr.addEventListener('loadend', () => {
            this.querySelector('.success').classList.remove('show');
            this.reset();
        })
    }

    document.querySelectorAll('.form').forEach(form => {
        form.addEventListener('submit', function() {
            event.preventDefault();
            let formData = new FormData(this);
            let obj = {};
    
            for (let i = 0; i < formData.length; i++) {
                obj[formData[i][0]] = obj[formData[i][1]];
            }
            
            ajaxSend.call(this, obj);
        })
    })
}