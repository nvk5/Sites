export default function setTabs() {
    const tabTextContent = document.querySelectorAll('.features__block');
    const thumbs = document.querySelectorAll('.features__tab-thumb-image');
    const mainImg = document.querySelector('.features__tab-main-image');

    const prevPrice = document.querySelector('.features__price-prev span');
    const currentPrice = document.querySelector('.features__price-current span');
    const discount = document.querySelector('.features__discount span');


    function hideContent(tab) {
        for(let i = tab; i < tabTextContent.length; i++) {
            tabTextContent[i].classList.remove('show');
            tabTextContent[i].classList.remove('fadeIn');
            tabTextContent[i].classList.add('hide');
            tabTextContent[i].classList.add('fadeOut');
        }
    }
    hideContent(1);

    function showContent(tab) {
        [...tabTextContent].filter((item, i) => item.classList.contains('hide') && i === tab).forEach(item => {
            item.classList.remove('hide');
            item.classList.remove('fadeOut');
            item.classList.add('show');
            item.classList.add('fadeIn');
        })
    }

    thumbs.forEach((item, i) => {
        item.addEventListener('click', showHide.bind(item, i));
        item.addEventListener('keyup', (event) => {
            if (event.key == 'Enter' || event.key == ' ') {
                showHide.call(item, i);
            }
        });
    })

    function showHide(i) {
        prevPrice.textContent = this.dataset.prev;
        currentPrice.textContent = this.dataset.current;
        discount.textContent = this.dataset.discount;
        mainImg.src = this.dataset.full;
        hideContent(0);
        showContent(i);
    }
}