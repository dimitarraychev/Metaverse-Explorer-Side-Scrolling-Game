import { resetState } from "../state/resetState.js";
import { playMusic, audioControl } from "../fx/audio.js";
import { elements } from "../game/elements.js";
import { gameLoop } from "../engine.js";
import { bossBackgroundEffect } from "../fx/visual.js";
import { attachParalax, removeParalax } from "../fx/parallax.js";
import { preloadImages } from "../util/imgPreload.js";
import { pauseMenu } from "./pauseMenu.js";

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

attachParalax('.legend');
preloadImages();

function initialStart(event) {
    resetState();
    onGameStart(event);
}

export function onGameStart(event) {
    const userInterface = document.querySelector('.user-interface');

    removeParalax();

    playMusic('theme');

    if (!scene.isBossFight) bossBackgroundEffect(false);

    checkHardMode();

    startMenu.classList.add('hide');
    pauseBtn.classList.remove('hide');
    userInterface.classList.remove('hide');
    toggleHard.classList.add('hide');
    level.textContent = 'Level 1';
    level.style.color = '#00FF41';

    elements.addCharacter();
    elements.addLives();

    window.requestAnimationFrame(gameLoop);
}

function onKeyDown(event) {
    keys[event.code] = true;
}

function onKeyUp(event) {
    keys[event.code] = false;
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