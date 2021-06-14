export const modal = ({ parentSelector, targetSelector, overlaySelector, closeBtnSelector, display } = {}) => {
    const parents = document.querySelectorAll(parentSelector);
    const overlay = document.querySelector(overlaySelector);
    let triggerItem;

    const openModal = event => {
        event.preventDefault();

        const closest = event.target.closest(targetSelector);
        triggerItem = closest;

        if (event.target && closest) {
            overlay.classList.add('show');
            document.body.classList.add('overflowed');
            overlay.style.display = display;
            overlay.tabIndex = '-1';
            overlay.focus();

            setTimeout(() => overlay.classList.remove('show'), 500);
        }
    }

    const closeModal = event => {
        function removeClassSelectorDot(selector) {
            return selector.replace(/\./, '');
        }

        const overlaySelectorMod = removeClassSelectorDot(overlaySelector);
        const closeButtonSelectorMod = removeClassSelectorDot(closeBtnSelector);

        if (event.target.classList.contains(overlaySelectorMod) || event.target.classList.contains(closeButtonSelectorMod)) {
            overlay.classList.add('hide');
            document.body.classList.remove('overflowed');
            triggerItem.focus();

            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.classList.remove('hide');
            }, 500);
        }
    }

    parents.forEach(item => item.addEventListener('click', openModal));
    document.addEventListener('click', closeModal);
}