const gameStartBtn = document.querySelector('.game-start');
const restartGameBtn = document.querySelector('.restart-game');
const startMenu = document.querySelector('.start-menu');
const pauseBtn = document.querySelector('.pause-menu');
const gameScore = document.querySelector('.score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gamePoints = document.querySelector('.points');
const bugStats = document.querySelector('.bug-stats');
const bitcoinStats = document.querySelector('.bitcoin-stats');
const timeStats = document.querySelector('.time-stats');
const scoreStats = document.querySelector('.score-stats')
const bossHealthBox = document.querySelector('.boss-health');
const bossHealthBar = document.querySelector('.boss-bar');
const bossSingleHPBar = document.querySelector('.boss-hp');
const endMessage = document.querySelector('.end-message');
const level = document.querySelector('.level');

gameStartBtn.addEventListener('click', onGameStart);
restartGameBtn.addEventListener('click', restartGame);
pauseBtn.addEventListener('click', pauseMenu);

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// game start function
function onGameStart(event) {

    startMenu.classList.add('hide');
    pauseBtn.classList.remove('hide');
    gameScore.classList.remove('hide');
    level.textContent = 'Level 1';
    level.style.color = '#00FF41';

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

//pause menu
function pauseMenu() {

    scene.isGameActive = false;

    startMenu.classList.remove('hide');
    pauseBtn.classList.add('hide');

    //remove start btn and create continue btn
    gameStartBtn.remove();
    const continueBtn = document.createElement('button');
    continueBtn.classList.add('continue-btn');
    continueBtn.textContent = 'Continue?'
    continueBtn.addEventListener('click', continueGame)

    startMenu.insertBefore(continueBtn, startMenu.firstChild);

    function continueGame() {

        scene.isGameActive = true;

        startMenu.classList.add('hide');
        pauseBtn.classList.remove('hide');
    
        continueBtn.remove();
        startMenu.insertBefore(gameStartBtn, startMenu.firstChild);

        //start game loop
        window.requestAnimationFrame(gameAction);
    }
}

//end game
function gameOverAction() {
    //standart case
    gameScore.classList.add('hide');
    pauseBtn.classList.add('hide');
    level.textContent = '';
    scene.isGameActive = false;

    gameOver.classList.remove('hide');
    endMessage.textContent = 'Game Over!';
    endMessage.style.color = 'red';

    bugStats.textContent = scene.killedBugs;
    bitcoinStats.textContent = scene.collectedBitcoins;
    timeStats.textContent = convertMillisecsToMins(scene.timePlayed);
    scoreStats.textContent = Math.trunc(scene.score);

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
    bossController.bossLastBullet = 0;

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
        const bossAllHPBars = document.querySelectorAll('.boss-hp');
        const bossBullets = document.querySelectorAll('.boss-bullet');

        meteorites.forEach(meteorite => meteorite.remove());
        boss.remove();
        bossAllHPBars.forEach(bar => bar.remove());
        bossBullets.forEach(bossBullet => bossBullet.remove());
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
    } else if (scene.score > 5000 && scene.isBossFight === false && 
        scene.defeatedBoss === false && bossController.loadingBoss === false) {
        level.textContent = 'BOSS';
        level.style.color = '#880808';
        game.speed = 2;
        game.bugSpawnInterval = Infinity;
        startBossFight();
    }
}

//boss fight start and end
function startBossFight() {
    bossController.loadingBoss = true;

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
    scene.score += game.bossKillbonus;

    bossHealthBox.classList.add('hide');
    gameOverAction();
}

function convertMillisecsToMins(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(milliseconds / 1000);
  
    // Calculate minutes and remaining seconds
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
  
    return `${minutes}:${seconds}`;
  }