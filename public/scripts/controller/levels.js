const bossHealthBox = document.querySelector('.boss-health');
const bossHealthBar = document.querySelector('.boss-bar');
const level = document.querySelector('.level');

//next level requirements and changes
function proceedToNextLevel() {
    
    let isBoss = false;

    //level 2
    if (scene.score > 1000 && scene.score < 2000 && level.textContent === 'Level 1') {
        level.textContent = 'Level 2';
        levelNotification('Level 2', 1000);
        game.speed = 2.5;
        game.bugSpawnInterval = 800;
        game.bitcoinSpawnInterval = 2750;

        //level 3
    } else if (scene.score > 2000 && scene.score < 2500 && level.textContent === 'Level 2') {
        level.textContent = 'Level 3';
        levelNotification('Level 3', 1000);
        game.speed = 3;
        game.bugSpawnInterval = 650;
        game.bitcoinSpawnInterval = 2500;

        //miniboss
    } else if (scene.score > 2500 && scene.score < 3000 && !scene.isMiniBossFight &&
        !scene.defeatedMiniBoss && !miniBossController.loadingMiniBoss) {
        isBoss = 'miniboss';

        //level 4
    } else if (scene.score > 3000 && scene.score < 5000 && level.textContent === 'Level 3') {
        level.textContent = 'Level 4';
        levelNotification('Level 4', 1000);
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
        isBoss = 'boss';
    }

    return isBoss;
}

//mini boss fight start and end
function startMiniBossFight() {

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

    //show and remove get ready message
    levelNotification('Get Ready...', 3000);

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

    bossHealthBox.classList.add('hide');
}

function levelNotification(level, timeout) {
    const notification = document.createElement('div');
    notification.classList.add('level-notification');
    notification.textContent = level;
    const gameArea = document.querySelector('.game-area');
    gameArea.appendChild(notification);

    function removeNotification() {
        notification.remove()
    }
    setTimeout(removeNotification, timeout);
}

export {
    proceedToNextLevel,
    startMiniBossFight,
    endMiniBossFight,
    startBossFight,
    endBossFight
}