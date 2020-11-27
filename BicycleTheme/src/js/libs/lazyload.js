import LazyLoad from 'vanilla-lazyload';

export const lazyload = () => {
    new LazyLoad({ elements_selector: '.lazy' })
}