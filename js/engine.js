//game loop function
function gameAction(timestamp) {
    const character = document.querySelector('.character');
    const bugs = document.querySelectorAll('.bug');
    const bullets = document.querySelectorAll('.bullet');
    const bitcoins = document.querySelectorAll('.bitcoin');

    //increment score count
    scene.score += 0.1;

    //apply gravitation
    const isInAir = (player.y + player.height) <= gameArea.offsetHeight;
    if (isInAir) player.y += game.speed;

    //add elements
    addAndModifyBugs(timestamp);
    addAndModifyClouds(timestamp);
    addAndModifyBitcoins(timestamp);
    modifyBulletsPositions();

    //register user input
    if (keys.ArrowUp && player.y > 0 || keys.KeyW && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
        addFlyEffect();

        if (keys.Space && timestamp - player.lastBullet > game.bulletInterval) {
            addShootAndFlyEffects();
            addBullet(player);
            player.lastBullet = timestamp;
        } 
    }

    if (keys.ArrowDown && isInAir || keys.KeyS && isInAir) {
        player.y += game.speed * game.movingMultiplier;
    }

    if (keys.ArrowLeft && player.x > 0 || keys.KeyA && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }

    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth || keys.KeyD && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }

    if (keys.Space && timestamp - player.lastBullet > game.bulletInterval) {
        addShootEffect();
        addBullet(player);
        player.lastBullet = timestamp;
    } 

    //detect collisions
    bugs.forEach(bug => {
        if (isCollision(character, bug)) loseLive(timestamp);

        bullets.forEach(bullet => {
            if (isCollision(bullet, bug)) {
                scene.score += game.bugKillBonus;
                scene.killedBugs++;
                bullet.remove();
                bug.remove();
            }
        })
    });

    bitcoins.forEach(bitcoin => {
        if (isCollision(character, bitcoin)) {
            scene.score += game.bitcoinCollectBonus;
            scene.collectedBitcoins++;
            bitcoin.remove();
        }
    });

    //apply movement
    character.style.top = player.y + 'px';
    character.style.left = player.x + 'px';

    //apply score
    gamePoints.textContent = Math.trunc(scene.score);

    //proceed to next levels
    proceedToNextLevel();

    if (scene.isGameActive) window.requestAnimationFrame(gameAction);
}

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

    function removeFlyingEffect() {
        character.classList.remove('character-flying');
    }

    setTimeout(removeFlyingEffect, 100);
}

function addShootAndFlyEffects() {
    const character = document.querySelector('.character');
    character.classList.add('character-flyingshoot');

    function removeFlyingEffect() {
        character.classList.remove('character-flyingshoot');
    }

    setTimeout(removeFlyingEffect, 100);
}

function isCollision(firstElement, secondElement) {
    let firstRect = firstElement.getBoundingClientRect();
    let secondRect = secondElement.getBoundingClientRect();

    return !(firstRect.top > secondRect.bottom ||
        firstRect.bottom < secondRect.top ||
        firstRect.right < secondRect.left ||
        firstRect.left > secondRect.right);
}

function loseLive(timestamp) {
    const character = document.querySelector('.character');

    if (timestamp - scene.lastLostLive > game.lostLiveInterval) {
        character.classList.add('character-hit');

        function removeHitEffect() {
            character.classList.remove('character-hit');
        }
        setTimeout(removeHitEffect, 150);

        const currLive = document.querySelector('.live');
        currLive.remove();
        player.lives--;
        scene.lastLostLive = timestamp;

        if (player.lives < 1) gameOverAction();
    }
}