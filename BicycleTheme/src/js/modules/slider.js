import Glide from '@glidejs/glide';

export const slider = () => {
    new Glide('.glide', {
        type: 'carousel'
    }).mount();
}