import {elements} from "../game/elements.js";
import { playMusic, pauseMusic } from "../fx/audio.js";
import {bossBackgroundEffect} from "../fx/visual.js";
import {removeAllElements} from "../util/removeElements.js";

const bossHealthBox = document.querySelector('.boss-health');
const bossHealthBar = document.querySelector('.boss-bar');
const level = document.querySelector('.level');
const bossNameRef = document.querySelector('.boss-health p');

export function proceedToNextLevel() {

    if (scene.score > 1000 && scene.score < 2000 && level.textContent === 'Level 1') {
        level.textContent = 'Level 2';
        levelNotification('Level 2', 1000);
        game.speed = 2.33;
        game.bugSpawnInterval = 800;
        game.bitcoinSpawnInterval = 2750;

    } else if (scene.score > 2000 && scene.score < 2500 && level.textContent === 'Level 2') {
        level.textContent = 'Level 3';
        levelNotification('Level 3', 1000);
        game.speed = 2.66;
        game.bugSpawnInterval = 650;
        game.bitcoinSpawnInterval = 2500;

    } else if (scene.score > 2500 && scene.score < 3000 && !scene.isMiniBossFight &&
        !scene.defeatedMiniBoss && !miniBossController.loadingMiniBoss) {
        miniBossController.loadingMiniBoss = true;
        startMiniBossFight();

    } else if (scene.score > 3000 && scene.score < 5000 && level.textContent === 'Level 3') {
        level.textContent = 'Level 4';
        levelNotification('Level 4', 1000);
        game.speed = 3;
        game.bugSpawnInterval = 500;
        game.bitcoinSpawnInterval = 2000;

    } else if (scene.score > 5000 && scene.defeatedMiniBoss && !scene.isBossFight &&
        !scene.defeatedBoss && !bossController.loadingBoss) {
        bossController.loadingBoss = true;
        level.textContent = 'BOSS';
        level.style.color = '#880808';
        game.speed = 2;
        game.bugSpawnInterval = Infinity;
        startBossFight();
    }
}

export function startMiniBossFight() {

    elements.addMiniBoss();

    bossHealthBox.classList.remove('hide');
    const bossName = bossHealthBox.querySelector('p');
    bossName.textContent = 'Minor Bug';
    bossHealthBox.style.width = '20%';
    bossNameRef.style.width = '85%';

    for (let index = 0; index < miniBossController.health / 5; index++) {
        let miniBossHealth = document.createElement('div');
        miniBossHealth.classList.add('boss-hp');
        bossHealthBar.appendChild(miniBossHealth);
    }
}

export function endMiniBossFight() {
    scene.isMiniBossFight = false;
    scene.defeatedMiniBoss = true;
    scene.score += game.miniBossKillBonus;

    const miniBossBullets = document.querySelectorAll('.miniboss-bullet');
    miniBossBullets.forEach(miniBossBullet => {
        miniBossBullet.remove();
    });

    bossHealthBox.classList.add('hide');
    const miniBoss = document.querySelector('.miniboss');
    miniBoss.remove();
}

export function startBossFight() {
    
    scene.metBoss = true;

    bossHealthBox.style.width = '68%';
    bossNameRef.style.width = '30%';

    pauseMusic('theme');
    playMusic('boss');

    bossBackgroundEffect(true);

    removeAllElements();
    setTimeout(elements.addBoss, 3000);

    levelNotification('Get Ready...', 3000);

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

export function endBossFight() {
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