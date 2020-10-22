import smoothscroll from 'smoothscroll-polyfill';
import objectFitImages from 'object-fit-images';
import svg from 'svg4everybody';
// import fromEntries from 'object.fromentries';

export default function polyfillsInit() {

    //forEach polyfill IE11
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    //scrollTo({behavior:'smooth'}) IE11
    smoothscroll.polyfill();

    //svg sprites IE11
    svg();

    //Object-fit IE11
    const images = document.querySelectorAll('img:not([src$=".svg"])');
    images.forEach(item => item.style.fontFamily = "'object-fit: cover'");
    objectFitImages(images);

    ////Object.fromEntries IE11
    // if (!Object.fromEntries) {
    //     fromEntries.shim();
    // }
}

