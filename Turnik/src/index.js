import './js/main';
import './assets/css/style.css';
const images = require.context("./assets/images/", true, /.*\.(jpg|jpeg|png|webp|gif|svg)$/);
const fonts = require.context("./assets/fonts/", true, /.*\.(ttf|woff|woff2|eot)$/);
const assets = [images, fonts];

assets.forEach(files => {
    files.keys().forEach(key => {
        files(key);
    })
});



