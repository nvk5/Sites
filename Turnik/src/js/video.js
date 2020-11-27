const video = () => {
    const source = [
        "https://www.youtube.com/embed/lrryterjwQs",
        "https://www.youtube.com/embed/lrryterjwQs"
    ]
    const iframe = document.querySelectorAll('.video__frame');
    const prevBlock = document.querySelector('.products');
    let search = true;

    const checkVisibility = elem => {
        const windowScroll = window.pageYOffset;
        const windowScrollBottom = windowScroll + document.documentElement.clientHeight;
        const elemTop = elem.offsetTop;

        return windowScrollBottom >= elemTop;
    }

    const setIframe = () => {
        if (checkVisibility(prevBlock) && search) {
            iframe.forEach((item, i) => item.src = source[i]);
            search = false;
            window.removeEventListener('scroll', setIframe);
        }
    }

    setIframe();
    window.addEventListener('scroll', setIframe);

}

export default video;