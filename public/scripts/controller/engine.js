import { pauseMusic, playSoundEffect } from "../view/audioManager.js";
import { addEffect } from "../view/visualEffects.js";
import { gameOverAction } from "../view/endView.js";
import { pauseMenu } from "../view/startView.js";
import { proceedToNextLevel, endBossFight, endMiniBossFight } from "./levels.js";
import { collisionDetection } from "./collisionDetection.js";
import { elementController } from "./elementController.js";
import { events } from "./events.js";

const gameArea = document.querySelector('.game-area');

//game loop function
function gameAction(timestamp) {
    const character = document.querySelector('.character');
    const boss = document.querySelector('.boss');
    const miniBoss = document.querySelector('.miniboss');
    const gamePoints = document.querySelector('.points');

    //start time snapshot
    if (!scene.takenSnapshot) {
        scene.runStartTime = timestamp;
        scene.takenSnapshot = true;
    }

    //increment score count
    scene.score += 0.1;

    //handles gravitation
    const isInAir = applyGravity(character);

    //add and modify elements
    elementController.addAndModifyBugs(timestamp);
    elementController.addAndModifyClouds(timestamp);
    elementController.addAndModifyBuildings(timestamp);
    elementController.addAndModifyBitcoins(timestamp);
    elementController.modifyBulletsPositions();

    //add and modify elements in miniboss fight
    if (scene.isMiniBossFight) {
        elementController.modifyMiniBoss();
        elementController.addAndModifyMiniBossBullets(timestamp, miniBoss);

        //check if miniboss is killed
        if (miniBossController.health <= 0) endMiniBossFight();
    }

    //add and modify elements in boss fight
    if (scene.isBossFight) {
        elementController.modifyBoss();
        elementController.addAndModifyMeteorites(timestamp);
        elementController.addAndModifyBossBullets(timestamp, boss);

        //check if boss is killed
        if (bossController.health <= 0) {
            scene.runEndTime = timestamp;
            scene.isGameActive = false;
            pauseMusic('boss');
            playSoundEffect('gamewon');
            endBossFight();
            gameOverAction();
        }
    }

    //handles user input
    registerUserInput(timestamp, character, isInAir);

    //handles collisions
    const collision = collisionDetection(character, miniBoss, boss);
    if (collision.element === character) events.loseLife(timestamp, character);
    if (collision.isBug === true) events.hitBug(collision.element);
    if (collision.isBitcoin === true) events.collectBitcoin(character);
    if (collision.element === miniBoss) events.hitMiniBoss(miniBoss);
    if (collision.element === boss) events.hitBoss(boss);

    //apply movement
    character.style.top = player.y + 'px';
    character.style.left = player.x + 'px';

    //apply score
    gamePoints.textContent = Math.trunc(scene.score);

    //proceed to next levels
    proceedToNextLevel();

    if (scene.isGameActive) window.requestAnimationFrame(gameAction);
}

//apply gravitation
function applyGravity(character) {

    const isInAir = (player.y + player.height) <= gameArea.offsetHeight - 30;

    if (isInAir) {
        player.y += game.speed;
        player.isAtBottom = false;
    
        //penalty for staying at the bottom
    } else {
        addEffect(character, 'character-hit', 150);
        player.isAtBottom = true;
    }

    return isInAir;
}

//register user input
function registerUserInput(timestamp, character, isInAir) {

    if (keys.ArrowUp && player.y > 0 || keys.KeyW && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
        addEffect(character, 'character-flying', 100);

        if (keys.Space && timestamp - player.lastBullet > game.bulletInterval) {
            playSoundEffect('shoot');
            addEffect(character, 'character-flyingshoot', 100);
            elementController.addBullet(player);
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
        elementController.addBullet(player);
        player.lastBullet = timestamp;
    }

    if (keys.Escape) {
        pauseMenu();
    }
}

//used to start the game at startView
export { gameAction };