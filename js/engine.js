//game loop function
function gameAction(timestamp) {
    const character = document.querySelector('.character');
    const bugs = document.querySelectorAll('.bug');
    const bullets = document.querySelectorAll('.bullet');
    const bitcoins = document.querySelectorAll('.bitcoin');
    const boss = document.querySelector('.boss');
    const meteorites = document.querySelectorAll('.meteorite');
    const bossBullets = document.querySelectorAll('.boss-bullet');
    const gamePoints = document.querySelector('.points');

    // start time snapshot
    if (!scene.takenSnapshot) {
        scene.runStartTime = timestamp;
        scene.takenSnapshot = true;
    }
    
    //increment score count
    scene.score += 0.1;

    //apply gravitation
    const isInAir = (player.y + player.height) <= gameArea.offsetHeight - 30;
    if (isInAir) {
        player.y += game.speed;
        player.isAtBottom = false;

    //penalty for staying at the bottom
    } else {
        addHitEffect();
        player.isAtBottom = true;
    }
    
    //add and modify elements
    addAndModifyBugs(timestamp);
    addAndModifyClouds(timestamp);
    addAndModifyBuildings(timestamp);
    addAndModifyBitcoins(timestamp);
    modifyBulletsPositions();

    //add and modify elements in boss fight
    if (scene.isBossFight) {
        modifyBoss();
        addAndModifyMeteorites(timestamp);
        addAndModifyBossBullets(timestamp, boss);

        //check if boss is killed
        if (bossController.health <= 0) {
            scene.runEndTime = timestamp;
            endBossFight();
        }
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

    if (keys.Escape) {
        pauseMenu();
    }

    //detect collisions
    bugs.forEach(bug => {
        if (isCollision(character, bug)) loseLife(timestamp);

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
            addCollectEffect();
            scene.score += game.bitcoinCollectBonus;
            scene.collectedBitcoins++;
        }
    });

    //detect collisions in boss fight
    if (scene.isBossFight) {
        
        if (isCollision(character, boss)) loseLife(timestamp);

        bullets.forEach(bullet => {
            if(isCollision(bullet, boss)) {
                bullet.remove();
                hitBoss();
            }
        });

        meteorites.forEach(meteorite => {
            if(isCollision(character, meteorite)) loseLife(timestamp);
        });

        bossBullets.forEach(bossBullet => {
            if(isCollision(character, bossBullet)) {
                bossBullet.remove();
                loseLife(timestamp);
            }
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
    const firstRect = firstElement.getBoundingClientRect();
    const secondRect = secondElement.getBoundingClientRect();

    //moving the collisions further inside for the character and boss
    const character = document.querySelector('.character');
    const boss = document.querySelector('.boss');
    const charException = firstElement === character ? 30 : 0;
    const bossException = secondElement === boss ? 50 : 0;

    return !(firstRect.top + charException > secondRect.bottom - bossException ||
        firstRect.bottom - charException < secondRect.top + bossException ||
        firstRect.right - charException < secondRect.left + bossException ||
        firstRect.left + charException > secondRect.right - bossException);
}

//get hit
function loseLife(timestamp) {
    if (timestamp - player.lastLostLife > game.lostLifeInterval) {

        addHitEffect();
        addLifeHitEffect();

        function removeLife() {
            const currLife = document.querySelector('.life');
            currLife.remove();
        }
        setTimeout(removeLife, 250);

        player.lives--;
        player.lastLostLife = timestamp;

        //get killed
        if (player.lives <= 0) {
            if (scene.isBossFight) player.killedByBoss = true;
            scene.runEndTime = timestamp;
            gameOverAction();
        }
    }
}

function hitBoss() {

    addBossHitEffect();
    addBossLifeHitEffect();

    function removeBossLife() {
        const bossSingleHPBar = document.querySelector('.boss-hp:last-child');
        bossSingleHPBar.remove();
    }
    setTimeout(removeBossLife, 250);

    bossController.health -= 5;
    scene.score += game.bossHitBonus;
}