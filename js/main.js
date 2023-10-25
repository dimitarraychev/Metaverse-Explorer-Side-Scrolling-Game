const gameStartBtn = document.querySelector('.game-start');
const restartGameBtn = document.querySelector('.restart-game');
const startMenu = document.querySelector('.start-menu');
const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gamePoints = document.querySelector('.points');
const bugStats = document.querySelector('.bug-stats');
const bitcoinStats = document.querySelector('.bitcoin-stats');

gameStartBtn.addEventListener('click', onGameStart);
restartGameBtn.addEventListener('click', restartGame);

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// game start function
function onGameStart(event) {

    startMenu.classList.add('hide');

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
        let live = document.createElement('div');
        live.classList.add('live');
        livesContainer.appendChild(live);
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

function gameOverAction() {
    scene.isGameActive = false;
    bugStats.textContent = scene.killedBugs;
    bitcoinStats.textContent = scene.collectedBitcoins;
    gameOver.classList.remove('hide');
}

function restartGame() {
    const character = document.querySelector('.character');
    character.remove();
    removeAllElements();

    gameOver.classList.add('hide');

    // reset state objects
    player.x = 150;
    player.y = 300;
    player.lastBullet = 0;
    player.lives = 3;

    game.speed = 2;
    game.bugSpawnInterval = 1000;

    scene.score = 0;
    scene.lastCloudSpawn = 0;
    scene.lastBugSpawn = 0;
    scene.lastLostLive = 0;
    scene.isGameActive = true;

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
}

function proceedToNextLevel() {
    if (scene.score > 1000 && scene.score < 2000) {
        game.speed = 2.5;
        game.bugSpawnInterval = 800;
        game.bitcoinSpawnInterval = 2750;
    } else if (scene.score > 2000 && scene.score < 3000) {
        game.speed = 3;
        game.bugSpawnInterval = 650;
        game.bitcoinSpawnInterval = 2500;
    } else if (scene.score > 3000 && scene.score < 5000) {
        game.speed = 3.5;
        game.bugSpawnInterval = 500;
        game.bitcoinSpawnInterval = 2000;
    } else if (scene.score > 5000 && scene.isBossFight === false) {
        game.speed = 2;
        game.bugSpawnInterval = Infinity;
        startBossFight();
    }
}

//boss fight
function startBossFight() {
    scene.isBossFight = true;
    removeAllElements();
}