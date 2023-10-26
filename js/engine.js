//game loop function
function gameAction(timestamp) {
    const character = document.querySelector('.character');
    const bugs = document.querySelectorAll('.bug');
    const bullets = document.querySelectorAll('.bullet');
    const bitcoins = document.querySelectorAll('.bitcoin');
    const boss = document.querySelector('.boss');
    const meteorites = document.querySelectorAll('.meteorite');
    const bossSingleHPBar = document.querySelector('.boss-hp');


    //increment score count
    scene.score += 0.1;

    //apply gravitation
    const isInAir = (player.y + player.height) <= gameArea.offsetHeight - 33;
    if (isInAir) player.y += game.speed;

    //add and modify elements
    addAndModifyBugs(timestamp);
    addAndModifyClouds(timestamp);
    addAndModifyBitcoins(timestamp);
    modifyBulletsPositions();
    if (scene.isBossFight) {
        modifyBoss();
        addAndModifyMeteorites(timestamp);

        if (bossController.health <= 0) endBossFight();
    }
    
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

    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth || 
        keys.KeyD && player.x + player.width < gameArea.offsetWidth) {
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
                bullet.remove();
                bug.remove();
                scene.score += game.bugKillBonus;
                scene.killedBugs++;
            }
        });
    });

    bitcoins.forEach(bitcoin => {
        if (isCollision(character, bitcoin)) {
            bitcoin.remove();
            scene.score += game.bitcoinCollectBonus;
            scene.collectedBitcoins++;
        }
    });

    if (scene.isBossFight) {
        bullets.forEach(bullet => {
            if(isCollision(boss, bullet)) {
                bullet.remove();
                addBossHitEffect();
                bossController.health -= 5;
                bossSingleHPBar.remove();
            }
        });

        meteorites.forEach(meteorite => {
            if(isCollision(character, meteorite)) loseLive(timestamp);
        });
    }

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
    if (timestamp - player.lastLostLive > game.lostLiveInterval) {

        addHitEffect();
        const currLive = document.querySelector('.live');
        currLive.remove();
        player.lives--;
        player.lastLostLive = timestamp;

        if (player.lives <= 0) {
            if (scene.isBossFight) player.killedByBoss = true;
            gameOverAction();
        }
    }
}