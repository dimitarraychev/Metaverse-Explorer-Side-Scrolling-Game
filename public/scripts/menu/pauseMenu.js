import { playMusic, pauseMusic } from "../fx/audio.js";
import {gameLoop} from "../engine.js";
import { attachParalax, removeParalax } from "../fx/parallax.js";

const pauseBtn = document.querySelector('.pause-menu');
const level = document.querySelector('.level');
const startMenu = document.querySelector('.start-menu');
const gameStartBtn = document.querySelector('.game-start');

export function pauseMenu() {
    const livesContainer = document.querySelector('.lives-container');

    scene.isGameActive = false;
    startMenu.classList.remove('hide');
    pauseBtn.classList.add('hide');
    level.classList.add('hide');
    livesContainer.classList.add('hide');

    attachParalax('.legend');

    if (!scene.isBossFight) {
        pauseMusic('theme');
    } else { 
        pauseMusic('boss');
    }

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
        level.classList.remove('hide');
        livesContainer.classList.remove('hide');

        removeParalax();

        if (!scene.isBossFight) {
            playMusic('theme');
        } else {
            playMusic('boss');        
        }

        continueBtn.remove();
        startMenu.insertBefore(gameStartBtn, startMenu.firstChild);

        window.requestAnimationFrame(gameLoop);
    }
}