export function addEffect(element, effect, timeout) {
    element.classList.add(effect);

    function removeEffect() {
        element.classList.remove(effect);
    }

    setTimeout(removeEffect, timeout);
}

export function bossBackgroundEffect(bool) {
    const background = document.querySelector('.game-area');

    if (bool) {
        background.style.background = 'linear-gradient(0deg, rgba(13,2,8,1) 0%, rgba(136,8,8,1) 33%, rgba(13,2,8,1) 100%)';
    } else {
        background.style.background = 'linear-gradient(0deg, rgba(13,2,8,1) 0%, rgba(9,9,121,1) 33%, rgba(13,2,8,1) 100%)';
    }
}