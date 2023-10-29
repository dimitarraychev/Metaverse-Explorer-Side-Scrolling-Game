//character effects
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

function addCollectEffect() {
    const character = document.querySelector('.character');
    character.classList.add('character-collect');

    function removeHitEffect() {
        character.classList.remove('character-collect');
    }
    setTimeout(removeHitEffect, 150);
}


//miniboss effects
function addMiniBossHitEffect() {
    const miniBoss = document.querySelector('.miniboss');
    miniBoss.classList.add('miniboss-hit');
    
    function removeMiniBossHitEffect() {
        miniBoss.classList.remove('miniboss-hit');
    }
    setTimeout(removeMiniBossHitEffect, 150);
}

function addMiniBossShootEffect() {
    const miniBoss = document.querySelector('.miniboss');
    miniBoss.classList.add('miniboss-shoot');
    
    function removeMiniBossShootEffect() {
        miniBoss.classList.remove('miniboss-shoot');
    }
    setTimeout(removeMiniBossShootEffect, 150);
}

//boss effects
function addBossHitEffect() {
    const boss = document.querySelector('.boss');
    boss.classList.add('boss-hit');
    
    function removeHitEffect() {
        boss.classList.remove('boss-hit');
    }
    setTimeout(removeHitEffect, 150);
}

function addBossShootEffect() {
    const boss = document.querySelector('.boss');
    boss.classList.add('boss-shoot');
    
    function removeShootEffect() {
        boss.classList.remove('boss-shoot');
    }
    setTimeout(removeShootEffect, 150);
}

//life effects
function addLifeHitEffect() {
    const life = document.querySelector('.life');
    life.classList.add('life-hit');

    function removeLifeHitEffect() {
        life.classList.remove('life-hit');
    }
    setTimeout(removeLifeHitEffect, 250);
}

function addBossLifeHitEffect() {
    const bossSingleHPBar = document.querySelector('.boss-hp:last-child');
    bossSingleHPBar.classList.add('bosshp-hit');

    function removeLifeHitEffect() {
        bossSingleHPBar.classList.remove('bosshp-hit');
    }
    setTimeout(removeLifeHitEffect, 250);
}