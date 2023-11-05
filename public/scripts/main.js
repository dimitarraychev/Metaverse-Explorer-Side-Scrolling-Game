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
const highScoreStats = document.querySelector('.highscore-stats');
const bossHealthBox = document.querySelector('.boss-health');
const bossHealthBar = document.querySelector('.boss-bar');
const bossSingleHPBar = document.querySelector('.boss-hp');
const endMessage = document.querySelector('.end-message');
const level = document.querySelector('.level');
const audioBtn = document.querySelector('.audiobutton');

gameStartBtn.addEventListener('click', onGameStart);
restartGameBtn.addEventListener('click', restartGame);
pauseBtn.addEventListener('click', pauseMenu);
audioBtn.addEventListener('click', audioControl);

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


// game start function
function onGameStart(event) {

    //play theme music
    playThemeMusic();

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

//enable/disable audio
function audioControl() {
    if (game.isAudioEnabled) {
        game.isAudioEnabled = false;
        audioBtn.classList.add('audiobutton-paused');

        if (!scene.isBossFight) {
            pauseThemeMusic()
        } else {
            pauseBossMusic()
        }
    } else {
        game.isAudioEnabled = true;
        audioBtn.classList.remove('audiobutton-paused');

        if (!scene.isBossFight) {
            playThemeMusic();
        } else {
            playBossMusic();
        }
    }
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

    //add menu
    scene.isGameActive = false;
    startMenu.classList.remove('hide');
    pauseBtn.classList.add('hide');

    //pause audio
    if (!scene.isBossFight) {
        pauseThemeMusic();
    } else { 
        pauseBossMusic();
    }

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

        //resume audio
        if (!scene.isBossFight) {
            playThemeMusic();
        } else {
            playBossMusic();
        }

        //remove continue button and add start button
        continueBtn.remove();
        startMenu.insertBefore(gameStartBtn, startMenu.firstChild);

        //start game loop
        window.requestAnimationFrame(gameAction);
    }
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

//end game
function gameOverAction() {
    //standart case
    gameScore.classList.add('hide');
    pauseBtn.classList.add('hide');
    level.textContent = '';
    level.classList.add('hide');
    scene.isGameActive = false;

    pauseThemeMusic();

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
        hardModeStats.textContent = 'Yes +20%';
        hardModeStats.style.color = 'green';
        scene.score *= 1.2;
        scoreStats.style.color = 'green';
    } else {
        hardModeStats.textContent = 'No';
        hardModeStats.style.color = 'red';
        scoreStats.style.color = '#00FF41';
    }

    if (Math.trunc(scene.score) > scene.highScore) {
        highScoreStats.textContent = Math.trunc(scene.score);
        scene.highScore = Math.trunc(scene.score);
        highScoreStats.style.color = 'green';
    } else {
        highScoreStats.textContent = scene.highScore;
        highScoreStats.style.color = '#00FF41';
    }

    scoreStats.textContent = Math.trunc(scene.score);

    //killed by boss case or miniboss
    if (player.killedByBoss) {
        pauseBossMusic();
        bossHealthBox.classList.add('hide');
    }
    if (scene.isMiniBossFight) bossHealthBox.classList.add('hide');

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

    //change background to default
    removeBossBackgroundEffect();

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

    //delete elements in boss fight
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

    //delete elements in miniboss fight
    if (scene.isMiniBossFight) {
        const miniBoss = document.querySelector('.miniboss');
        const miniBossBullets = document.querySelectorAll('.miniboss-bullet');
        const miniBossAllHPBars = document.querySelectorAll('.boss-hp');

        miniBoss.remove();
        miniBossBullets.forEach(miniBossBullet => miniBossBullet.remove());
        miniBossAllHPBars.forEach(bar => bar.remove());
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

function convertMillisecsToMins(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and remaining seconds
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (minutes < 10) minutes = minutes.toString().padStart(2, '0');
    if (seconds < 10) seconds = seconds.toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
}