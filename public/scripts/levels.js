//next level requirements and changes
function proceedToNextLevel() {

    //level 2
    if (scene.score > 1000 && scene.score < 2000) {
        level.textContent = 'Level 2';
        game.speed = 2.5;
        game.bugSpawnInterval = 800;
        game.bitcoinSpawnInterval = 2750;

        //level 3
    } else if (scene.score > 2000 && scene.score < 2500) {
        level.textContent = 'Level 3';
        game.speed = 3;
        game.bugSpawnInterval = 650;
        game.bitcoinSpawnInterval = 2500;

        //miniboss
    } else if (scene.score > 2500 && scene.score < 3000 && !scene.isMiniBossFight &&
        !scene.defeatedMiniBoss && !miniBossController.loadingMiniBoss) {
        startMiniBossFight();

        //level 4
    } else if (scene.score > 3000 && scene.score < 5000) {
        level.textContent = 'Level 4';
        game.speed = 3.5;
        game.bugSpawnInterval = 500;
        game.bitcoinSpawnInterval = 2000;

        //level Boss
    } else if (scene.score > 5000 && scene.defeatedMiniBoss && !scene.isBossFight &&
        !scene.defeatedBoss && !bossController.loadingBoss) {
        level.textContent = 'BOSS';
        level.style.color = '#880808';
        game.speed = 2;
        game.bugSpawnInterval = Infinity;
        startBossFight();
    }
}

//mini boss fight start and end
function startMiniBossFight() {
    miniBossController.loadingMiniBoss = true;
    addMiniBoss();

    //render miniboss health bar
    bossHealthBox.classList.remove('hide');
    const bossName = bossHealthBox.querySelector('p');
    bossName.textContent = 'Bug Monarch';

    for (let index = 0; index < miniBossController.health / 5; index++) {
        let miniBossHealth = document.createElement('div');
        miniBossHealth.classList.add('boss-hp');
        bossHealthBar.appendChild(miniBossHealth);
    }
}

function endMiniBossFight() {
    scene.isMiniBossFight = false;
    scene.defeatedMiniBoss = true;
    scene.score += game.miniBossKillBonus;

    //remove all miniboss bullets
    const miniBossBullets = document.querySelectorAll('.miniboss-bullet');
    miniBossBullets.forEach(miniBossBullet => {
        miniBossBullet.remove();
    });

    bossHealthBox.classList.add('hide');
    const miniBoss = document.querySelector('.miniboss');
    miniBoss.remove();
}

//boss fight start and end
function startBossFight() {
    bossController.loadingBoss = true;
    scene.metBoss = true;

    //change music
    pauseThemeMusic();
    playBossMusic();

    //change background
    addBossBackgroundEffect();

    removeAllElements();
    setTimeout(addBoss, 3000);

    //show and remove get ready message
    const getReady = document.createElement('div');
    getReady.classList.add('get-ready');
    getReady.textContent = 'Get Ready...';
    gameArea.appendChild(getReady);

    function removeGetReady() {
        getReady.remove()
    }
    setTimeout(removeGetReady, 3000)

    //render boss health bar with delay
    bossHealthBox.classList.remove('hide');
    const bossName = bossHealthBox.querySelector('p');
    bossName.textContent = 'Bug Prime';

    (async function slowForLoop() {
        for (let index = 0; index < bossController.health / 5; index++) {
            let bossHealth = document.createElement('div');
            bossHealth.classList.add('boss-hp');
            bossHealthBar.appendChild(bossHealth);
            await delay(150); // Delay each iteration by 150ms
        }
    })();

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

function endBossFight() {
    scene.isBossFight = false;
    scene.defeatedBoss = true;
    scene.score += game.bossKillBonus;

    pauseBossMusic();

    bossHealthBox.classList.add('hide');
    gameOverAction();
}