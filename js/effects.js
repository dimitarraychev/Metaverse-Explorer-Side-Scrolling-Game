function addShootEffect() {
    const character = document.querySelector('.character');
    character.classList.add('character-shoot');

    function removeShootEffect() {
        character.classList.remove('character-shoot');
    }

    setTimeout(removeShootEffect, 100);
}

function addFlyEffect() {
    const character = document.querySelector('.character');
    character.classList.add('character-flying');

    function removeFlyEffect() {
        character.classList.remove('character-flying');
    }

    setTimeout(removeFlyEffect, 100);
}

function addShootAndFlyEffects() {
    const character = document.querySelector('.character');
    character.classList.add('character-flyingshoot');

    function removeFlyingEffect() {
        character.classList.remove('character-flyingshoot');
    }

    setTimeout(removeFlyingEffect, 100);
}

function addHitEffect() {
    const character = document.querySelector('.character');
    character.classList.add('character-hit');

    function removeHitEffect() {
        character.classList.remove('character-hit');
    }
    setTimeout(removeHitEffect, 150);
}

function addBossHitEffect() {
    const boss = document.querySelector('.boss');
    boss.classList.add('boss-hit');
    
    function removeHitEffect() {
        boss.classList.remove('boss-hit');
    }
    setTimeout(removeHitEffect, 150);
}