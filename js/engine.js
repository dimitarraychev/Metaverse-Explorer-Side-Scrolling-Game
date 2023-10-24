//game loop function
function gameAction(timestamp) {
    const character = document.querySelector('.character');
    const bugs = document.querySelectorAll('.bug');
    const bullets = document.querySelectorAll('.bullet');

    //increment score count
    scene.score += 0.1;

    //apply gravitation
    const isInAir = (player.y + player.height) <= gameArea.offsetHeight;
    if (isInAir) player.y += game.speed;

    //add elements
    addAndModifyBugs(timestamp);
    addAndModifyClouds(timestamp);
    modifyBulletsPositions();

    //register user input
    if (keys.ArrowUp && player.y > 0 || keys.KeyW && player.y > 0) {
        character.classList.add('character-flying');
        player.y -= game.speed * game.movingMultiplier;
    } else {
        character.classList.remove('character-flying');
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
        character.classList.add('character-shoot');
        addBullet(player);
        player.lastBullet = timestamp;
    } else {
        character.classList.remove('character-shoot');
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

    //apply movement
    character.style.top = player.y + 'px';
    character.style.left = player.x + 'px';

    //apply score
    gamePoints.textContent = Math.trunc(scene.score);

    //proceed to next levels
    proceedToNextLevel();

    if (scene.isGameActive) window.requestAnimationFrame(gameAction);
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
    if (timestamp - scene.lastLostLive > game.lostLiveInterval) {

        const currLive = document.querySelector('.live');
        currLive.remove();
        player.lives--;

        scene.lastLostLive = timestamp;

        if (player.lives < 1) gameOverAction();
    }
}