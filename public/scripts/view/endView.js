import { resetState } from "../model/resetState.js";
import { removeAllElements, convertMillisecsToMins } from "../general/utils.js";
import { onGameStart } from "./startView.js";
import { attachParalax, removeParalax } from "./parallax.js";

const gameOver = document.querySelector('.game-over');
const endMessage = document.querySelector('.end-message');
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
const restartGameBtn = document.querySelector('.restart-game');
const gameScore = document.querySelector('.score');
const pauseBtn = document.querySelector('.pause-menu');
const level = document.querySelector('.level');
const hardModeSwitch = document.getElementById('switch');
const toggleHard = document.querySelector('.toggle');

//end game
function gameOverAction() {
    const livesContainer = document.querySelector('.lives-container');

    //standart case
    gameScore.classList.add('hide');
    pauseBtn.classList.add('hide');
    level.textContent = '';
    level.classList.add('hide');
    livesContainer.classList.add('hide');

    gameOver.classList.remove('hide');
    endMessage.textContent = 'Game Over!';
    endMessage.style.color = 'red';

    attachParalax('.endgame-stats');

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
    if (player.killedByBoss || scene.isMiniBossFight) bossHealthBox.classList.add('hide');

    //defeated boss case
    if (scene.defeatedBoss) {
        endMessage.textContent = 'Congratulations, you have defeated Bug Prime!';
        endMessage.style.color = 'green';

        //hard mode switch
        gameOver.appendChild(toggleHard);
        toggleHard.classList.remove('hide');
    }

    restartGameBtn.addEventListener('click', restartGame);
}

//restart game
function restartGame() {

    removeParalax();
    
    //remove elements
    const character = document.querySelector('.character');
    character.remove();
    removeAllElements();

    gameOver.classList.add('hide');

    //reset state objects
    resetState();

    onGameStart();
}

export { gameOverAction };