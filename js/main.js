const gameStartBtn = document.querySelector('.game-start');
const restartGameBtn = document.querySelector('.restart-game');
const startMenu = document.querySelector('.start-menu');
const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gamePoints = document.querySelector('.points');
const bugStats = document.querySelector('.bug-stats');
const bitcoinStats = document.querySelector('.bitcoin-stats');
const bossHealthBox = document.querySelector('.boss-health');
const bossHealthBar = document.querySelector('.boss-bar');
const endMessage = document.querySelector('.end-message');
const level = document.querySelector('.level');

gameStartBtn.addEventListener('click', onGameStart);
restartGameBtn.addEventListener('click', restartGame);

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// game start function
function onGameStart(event) {

    startMenu.classList.add('hide');
    level.textContent = 'Level 1';

    // render character
    const character = document.createElement('div');
    character.classList.add('character');
    character.style.top = player.y + 'px';
    character.style.left = player.x + 'px';
    gameArea.appendChild(character);

    player.width = character.offsetWidth;
    player.height = character.offsetHeight;

    // render lives
    const livesContainer = document.createElement('div');
    livesContainer.classList.add('lives-container');

    for (let index = 0; index < player.lives; index++) {
        let life = document.createElement('div');
        life.classList.add('life');
        livesContainer.appendChild(life);
    }

    gameArea.appendChild(livesContainer);

    //start game loop
    window.requestAnimationFrame(gameAction);
}

//key handlers
function onKeyDown(event) {
    keys[event.code] = true;
}

function onKeyUp(event) {
    keys[event.code] = false;
}

//end game
function gameOverAction() {
    //standart case
    scene.isGameActive = false;
    bugStats.textContent = scene.killedBugs;
    bitcoinStats.textContent = scene.collectedBitcoins;
    gameOver.classList.remove('hide');
    endMessage.textContent = 'Game Over!';
    endMessage.style.color = 'red';
    
    //killed by boss case
    if (player.killedByBoss) bossHealthBox.classList.add('hide');

    //defeated boss case
    if (scene.defeatedBoss) {
        endMessage.textContent = 'Congratulations, you got rid of all the Bugs in the Metaverse!';
        endMessage.style.color = 'green';
    }
}

//restart game
function restartGame() {

    //remove elements
    const character = document.querySelector('.character');
    character.remove();
    removeAllElements();

    gameOver.classList.add('hide');

    //reset state objects
    player.x = 150;
    player.y = 300;
    player.lastBullet = 0;
    player.lives = 3;
    player.lastLostLife = 0;
    player.killedByBoss = false;

    game.speed = 2;
    game.bugSpawnInterval = 1000;

    scene.score = 0;
    scene.killedBugs = 0;
    scene.collectedBitcoins = 0;
    scene.lastCloudSpawn = 0;
    scene.lastBugSpawn = 0;
    scene.lastBitcoinSpawn = 0;
    scene.lastMeteoriteSpawn = 0;
    scene.isGameActive = true;
    scene.isBossFight = false;
    scene.defeatedBoss = false;

    bossController.health = 100;
    bossController.goingUp = true;

    onGameStart();
}

//delete all present elements
function removeAllElements() {
    const clouds = document.querySelectorAll('.cloud');
    const bugs = document.querySelectorAll('.bug');
    const bullets = document.querySelectorAll('.bullet');
    const bitcoins = document.querySelectorAll('.bitcoin');

    clouds.forEach(cloud => cloud.remove());
    bugs.forEach(bug => bug.remove());
    bullets.forEach(bullet => bullet.remove());
    bitcoins.forEach(bitcoin => bitcoin.remove());

    //delete additional elements in boss fight
    if (scene.defeatedBoss || player.killedByBoss) {
        const meteorites = document.querySelectorAll('.meteorite');
        const boss = document.querySelector('.boss');

        meteorites.forEach(meteorite => meteorite.remove());
        boss.remove();
    }
}

//next level requirements
function proceedToNextLevel() {

    //level 2
    if (scene.score > 1000 && scene.score < 2000) {
        level.textContent = 'Level 2';
        game.speed = 2.5;
        game.bugSpawnInterval = 800;
        game.bitcoinSpawnInterval = 2750;

    //level 3
    } else if (scene.score > 2000 && scene.score < 3000) {
        level.textContent = 'Level 3';
        game.speed = 3;
        game.bugSpawnInterval = 650;
        game.bitcoinSpawnInterval = 2500;

    //level 4
    } else if (scene.score > 3000 && scene.score < 5000) {
        level.textContent = 'Level 4';
        game.speed = 3.5;
        game.bugSpawnInterval = 500;
        game.bitcoinSpawnInterval = 2000;

    //level Boss
    } else if (scene.score > 5000 && scene.isBossFight === false && scene.defeatedBoss === false) {
        level.textContent = 'BOSS';
        level.style.color = '#880808';
        game.speed = 2;
        game.bugSpawnInterval = Infinity;
        startBossFight();
    }
}

//boss fight start and end
function startBossFight() {
    scene.isBossFight = true;
    removeAllElements();
    addBoss();

    //render boss health bar
    bossHealthBox.classList.remove('hide');

    for (let index = 0; index < bossController.health / 5; index++) {
        let bossHealth = document.createElement('div');
        bossHealth.classList.add('boss-hp');
        bossHealthBar.appendChild(bossHealth);
    }
}

function endBossFight() {
    scene.isBossFight = false;
    scene.defeatedBoss = true;
    scene.score += game.bossKillbonus;

    bossHealthBox.classList.add('hide');
    gameOverAction();
}