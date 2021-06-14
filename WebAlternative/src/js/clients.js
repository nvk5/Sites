import Glide from '@glidejs/glide'

export const setClientSlider = () => {
    const glide = new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 4,
        gap: 0,
        breakpoints: {
            1600: {
                perView: 3
            },
            1200: {
                perView: 2
            },
            850: {
                perView: 1
            }
        }
    });

    glide.mount();
}