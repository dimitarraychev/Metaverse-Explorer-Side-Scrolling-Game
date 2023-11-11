import { resetState } from "../model/resetState.js";
import { playMusic, pauseMusic } from "../view/audioManager.js";
import { elementController } from "../controller/elementController.js";
import { gameAction } from "../controller/engine.js";
import { bossBackgroundEffect } from "../view/visualEffects.js";

const gameStartBtn = document.querySelector('.game-start');
const startMenu = document.querySelector('.start-menu');
const toggleHard = document.querySelector('.toggle');
const hardModeSwitch = document.getElementById('switch');
const pauseBtn = document.querySelector('.pause-menu');
const level = document.querySelector('.level');
const audioBtn = document.querySelector('.audiobutton');

gameStartBtn.addEventListener('click', initialStart);
pauseBtn.addEventListener('click', pauseMenu);
audioBtn.addEventListener('click', audioControl);

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

//initialize state objects
function initialStart(event) {
    resetState();
    onGameStart(event);
}

// game start function
function onGameStart(event) {
    const gameScore = document.querySelector('.score');

    //play theme music
    playMusic('theme');

    //change background to default
    if (!scene.isBossFight) bossBackgroundEffect(false);

    checkHardMode();

    startMenu.classList.add('hide');
    pauseBtn.classList.remove('hide');
    gameScore.classList.remove('hide');
    toggleHard.classList.add('hide');
    level.textContent = 'Level 1';
    level.style.color = '#00FF41';
    level.classList.remove('hide');

    elementController.addCharacter();
    elementController.addLives();

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

//enable/disable audio
function audioControl() {
    if (game.isAudioEnabled) {
        game.isAudioEnabled = false;
        audioBtn.classList.add('audiobutton-paused');

        if (!scene.isBossFight) {
            pauseMusic('theme');
        } else {
            pauseMusic('boss');
        }
    } else {
        game.isAudioEnabled = true;
        audioBtn.classList.remove('audiobutton-paused');

        if (!scene.isBossFight) {
            playMusic('theme');
        } else {
            playMusic('boss');        }
    }
}

//pause menu
function pauseMenu() {

    //add menu
    scene.isGameActive = false;
    startMenu.classList.remove('hide');
    pauseBtn.classList.add('hide');

    //pause audio
    if (!scene.isBossFight) {
        pauseMusic('theme');
    } else { 
        pauseMusic('boss');
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
            playMusic('theme');
        } else {
            playMusic('boss');        
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
        player.lives = 5;
    }
}

export { onGameStart, pauseMenu };