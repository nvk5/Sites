import './js/main';
import './assets/css/style.css';
const images = require.context("./assets/images/", true, /.*\.(jpg|jpeg|png|webp|gif|svg)$/);
const assets = [images];

assets.forEach(files => {
    files.keys().forEach(key => {
        files(key);
    })
});



