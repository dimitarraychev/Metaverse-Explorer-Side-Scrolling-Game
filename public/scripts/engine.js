import { pauseMusic, playSoundEffect } from "./fx/audio.js";
import { addEffect } from "./fx/visual.js";
import { gameOverAction } from "./menu/endMenu.js";
import { pauseMenu } from "./menu/pauseMenu.js";
import { proceedToNextLevel, endBossFight, endMiniBossFight } from "./game/levels.js";
import { collisionDetection } from "./util/collision.js";
import { elements } from "./game/elements.js";
import { events } from "./game/events.js";

const gameArea = document.querySelector('.game-area');

export function gameLoop(timestamp) {
    const character = document.querySelector('.character');
    const boss = document.querySelector('.boss');
    const miniBoss = document.querySelector('.miniboss');
    const gamePoints = document.querySelector('.points');

    if (!scene.takenSnapshot) {
        scene.runStartTime = timestamp;
        scene.takenSnapshot = true;
    }

    scene.score += 0.1;

    const isInAir = applyGravity(character);

    elements.addAndModifyBugs(timestamp);
    elements.addAndModifyClouds(timestamp);
    elements.addAndModifyBuildings(timestamp);
    elements.addAndModifyBitcoins(timestamp);
    elements.modifyBulletsPositions();

    if (scene.isMiniBossFight) {
        elements.modifyMiniBoss();
        elements.addAndModifyMiniBossBullets(timestamp, miniBoss);

        if (miniBossController.health <= 0) endMiniBossFight();
    }

    if (scene.isBossFight) {
        elements.modifyBoss();
        elements.addAndModifyMeteorites(timestamp);
        elements.addAndModifyBossBullets(timestamp, boss);

        if (bossController.health <= 0) {
            scene.runEndTime = timestamp;
            scene.isGameActive = false;
            pauseMusic('boss');
            playSoundEffect('gamewon');
            endBossFight();
            gameOverAction();
        }
    }

    registerUserInput(timestamp, character, isInAir);

    const collision = collisionDetection(character, miniBoss, boss);
    if (collision.element === character) events.loseLife(timestamp, character);
    if (collision.isBug === true) events.hitBug(collision.element);
    if (collision.isBitcoin === true) events.collectBitcoin(character);
    if (collision.element === miniBoss) events.hitMiniBoss(miniBoss);
    if (collision.element === boss) events.hitBoss(boss);

    character.style.top = player.y + 'px';
    character.style.left = player.x + 'px';

    gamePoints.textContent = Math.trunc(scene.score);

    proceedToNextLevel();

    if (scene.isGameActive) window.requestAnimationFrame(gameLoop);
}

function applyGravity(character) {

    const isInAir = (player.y + player.height) <= gameArea.offsetHeight;

    if (isInAir) {
        player.y += game.speed;
        player.isAtBottom = false;
    } else {
        addEffect(character, 'character-hit', 150);
        player.isAtBottom = true;
    }

    return isInAir;
}

function registerUserInput(timestamp, character, isInAir) {

    const topPadding = 20;

    if (keys.ArrowUp && player.y > topPadding || keys.KeyW && player.y > topPadding) {
        player.y -= game.speed * game.movingMultiplier;
        addEffect(character, 'character-flying', 100);

        if (keys.Space && timestamp - player.lastBullet > game.bulletInterval) {
            playSoundEffect('shoot');
            addEffect(character, 'character-flyingshoot', 100);
            elements.addBullet(player);
            player.lastBullet = timestamp;
        }
    }

    if (keys.ArrowDown && isInAir || keys.KeyS && isInAir) {
        player.y += game.speed * game.movingMultiplier;
    }

    if (keys.ArrowLeft && player.x > 0 || keys.KeyA && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }

    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth ||
        keys.KeyD && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }

    if (keys.Space && timestamp - player.lastBullet > game.bulletInterval) {
        playSoundEffect('shoot');
        addEffect(character, 'character-shoot', 100);
        elements.addBullet(player);
        player.lastBullet = timestamp;
    }

    if (keys.Escape) {
        pauseMenu();
    }
}