const gameStartBtn = document.querySelector('.game-start');
const restartGameBtn = document.querySelector('.restart-game');
const startMenu = document.querySelector('.start-menu');
const toggleHard = document.querySelector('.toggle');
const hardModeSwitch = document.getElementById('switch');
const pauseBtn = document.querySelector('.pause-menu');
const gameScore = document.querySelector('.score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gamePoints = document.querySelector('.points');
const bugStats = document.querySelector('.bug-stats');
const bitcoinStats = document.querySelector('.bitcoin-stats');
const totalTimeStats = document.querySelector('.totaltime-stats');
const runTimeStats = document.querySelector('.runtime-stats');
const metBossStats = document.querySelector('.metboss-stats');
const killedBossStats = document.querySelector('.killedboss-stats');
const killedMiniBossStats = document.querySelector('.killedminiboss-stats');
const hardModeStats = document.querySelector('.hardmode-stats');
const scoreStats = document.querySelector('.score-stats');
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

    //initialize state objects
    initState();

    checkHardMode();

    startMenu.classList.add('hide');
    pauseBtn.classList.remove('hide');
    gameScore.classList.remove('hide');
    toggleHard.classList.add('hide');
    level.textContent = 'Level 1';
    level.style.color = '#00FF41';
    level.classList.remove('hide');

    addCharacter();
    addLives();

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

    //remove start button and create continue button
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

        //remove continue button and add start button
        continueBtn.remove();
        startMenu.insertBefore(gameStartBtn, startMenu.firstChild);

        //start game loop
        window.requestAnimationFrame(gameAction);
    }
}

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
    } else if (scene.score > 5000 && !scene.isBossFight &&
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
}

function endMiniBossFight() {
    scene.isMiniBossFight = false;
    scene.defeatedMiniBoss = true;
    scene.score += game.miniBossKillBonus;

    const miniBoss = document.querySelector('.miniboss');
    miniBoss.remove();
}

//boss fight start and end
function startBossFight() {
    bossController.loadingBoss = true;
    scene.metBoss = true;

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
    scene.score += game.bossKillBonus;

    bossHealthBox.classList.add('hide');
    gameOverAction();
}

function checkHardMode() {
    if (hardModeSwitch.checked) {
        game.isHardMode = true;
        player.lives = 1;
    } else {
        game.isHardMode = false;
        player.lives = 3;
    }
}

function convertMillisecsToMins(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and remaining seconds
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return `${minutes}:${seconds}`;
}

//end game
function gameOverAction() {
    //standart case
    gameScore.classList.add('hide');
    pauseBtn.classList.add('hide');
    level.textContent = '';
    level.classList.add('hide');
    scene.isGameActive = false;

    gameOver.classList.remove('hide');
    endMessage.textContent = 'Game Over!';
    endMessage.style.color = 'red';

    //abillity to remove hard mode if it is on
    if (hardModeSwitch.checked) {
        gameOver.appendChild(toggleHard);
        toggleHard.classList.remove('hide');
    }

    //stats
    bugStats.textContent = scene.killedBugs;
    bitcoinStats.textContent = scene.collectedBitcoins;

    const currTime = scene.runEndTime - scene.runStartTime
    scene.timePlayed += currTime;
    runTimeStats.textContent = convertMillisecsToMins(currTime);
    totalTimeStats.textContent = convertMillisecsToMins(scene.timePlayed);

    if (scene.defeatedMiniBoss) {
        killedMiniBossStats.textContent = 'Yes';
        killedMiniBossStats.style.color = 'green';
    } else {
        killedMiniBossStats.textContent = 'No';
        killedMiniBossStats.style.color = 'red';
    }

    if (scene.metBoss) {
        metBossStats.textContent = 'Yes';
        metBossStats.style.color = 'green';
    } else {
        metBossStats.textContent = 'No';
        metBossStats.style.color = 'red';
    }

    if (scene.defeatedBoss) {
        killedBossStats.textContent = 'Yes';
        killedBossStats.style.color = 'green';
    } else {
        killedBossStats.textContent = 'No';
        killedBossStats.style.color = 'red';
    }

    if (game.isHardMode) {
        hardModeStats.textContent = 'Yes';
        hardModeStats.style.color = 'green';
    } else {
        hardModeStats.textContent = 'No';
        hardModeStats.style.color = 'red';
    }

    scoreStats.textContent = Math.trunc(scene.score);

    //killed by boss case
    if (player.killedByBoss) bossHealthBox.classList.add('hide');

    //defeated boss case
    if (scene.defeatedBoss) {
        endMessage.textContent = 'Congratulations, you have defeated Bug Prime!';
        endMessage.style.color = 'green';

        //hard mode switch
        gameOver.appendChild(toggleHard);
        toggleHard.classList.remove('hide');
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
    initState();

    onGameStart();
}

//delete all present elements
function removeAllElements() {
    const clouds = document.querySelectorAll('.cloud');
    const buildings = document.querySelectorAll('.building');
    const bugs = document.querySelectorAll('.bug');
    const bullets = document.querySelectorAll('.bullet');
    const bitcoins = document.querySelectorAll('.bitcoin');

    clouds.forEach(cloud => cloud.remove());
    buildings.forEach(building => building.remove());
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

    //handles difference between displayed lives and actual lives
    if (scene.defeatedBoss) {
        const displayedLives = Array.from(document.querySelectorAll('.life')).length;
        if (displayedLives > 0) {
            for (let i = 0; i < displayedLives; i++) {
                const extraLife = document.querySelector('.life');
                extraLife.remove()
            }
        }
    }
}