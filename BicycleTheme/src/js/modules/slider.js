import Glide from '@glidejs/glide';

const slider = () => {
    new Glide('.glide', {
        type: 'carousel'
    }).mount();
}

export default slider;