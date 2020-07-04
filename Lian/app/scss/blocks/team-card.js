// function bgWebpCheck() {
//     var query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)";

//     Modernizr.on('webp', function () {
//         if (matchMedia(query).matches) {
//             // do high-dpi stuff
//             console.log(123);
            
//         } else {
//             // do non high-dpi stuff
//             $('.team-card__img').each(function (i, elem) {
//                 var newPath = $(this).attr('data-bg').replace(/@[12]x/, '$&/webp').replace(/png|jpg/, "webp");
//                 $(this).attr('data-bg', newPath);
//             });
//         }
//     });

// }
// bgWebpCheck();
