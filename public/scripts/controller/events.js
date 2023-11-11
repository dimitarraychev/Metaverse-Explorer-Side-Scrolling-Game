import { playSoundEffect, pauseMusic } from "../view/audioManager.js";
import { addEffect } from "../view/visualEffects.js";
import { gameOverAction } from "../view/endView.js";

//character events
function collectBitcoin(character) {
    playSoundEffect('collect');
    addEffect(character, 'character-collect', 150);
    scene.score += game.bitcoinCollectBonus;
    scene.collectedBitcoins++;
}

function loseLife(timestamp, character) {
    const life = document.querySelector('.life:last-child');

    if (timestamp - player.lastLostLife > game.lostLifeInterval) {

        addEffect(character, 'character-hit', 150);
        addEffect(life, 'life-hit', 250);
        playSoundEffect('hit');

        function removeLife() {
            const currLife = document.querySelector('.life:last-child');
            currLife.remove();
        }
        setTimeout(removeLife, 250);

        player.lives--;
        player.lastLostLife = timestamp;

        //get killed
        if (player.lives <= 0) {
            if (scene.isBossFight) player.killedByBoss = true;
            scene.runEndTime = timestamp;
            scene.isGameActive = false;
            pauseMusic('theme');
            pauseMusic('boss');
            playSoundEffect('gameover');
            gameOverAction();
        }
    }
}

//enemy events
function hitBug(bug) {
    playSoundEffect('enemyhit');
    addEffect(bug, 'bug-hit', 50);

    function delayHit() {
        bug.remove();
        scene.score += game.bugKillBonus;
        scene.killedBugs++;
    }
    setTimeout(delayHit, 50);
}

function hitBoss(boss) {
    const bossSingleHPBar = document.querySelector('.boss-hp:last-child');

    addEffect(boss, 'boss-hit', 150);
    addEffect(bossSingleHPBar, 'bosshp-hit', 250);
    playSoundEffect('enemyhit');

    function removeBossLife() {
        bossSingleHPBar.remove();
    }
    setTimeout(removeBossLife, 250);

    bossController.health -= 5;
    scene.score += game.bossHitBonus;
}

function hitMiniBoss(miniBoss) {
    const bossSingleHPBar = document.querySelector('.boss-hp:last-child');

    addEffect(miniBoss, 'miniboss-hit', 150);
    addEffect(bossSingleHPBar, 'bosshp-hit', 250);
    playSoundEffect('enemyhit');

    function removeMiniBossLife() {
        bossSingleHPBar.remove();
    }
    setTimeout(removeMiniBossLife, 250);

    miniBossController.health -= 5;
    scene.score += game.miniBossHitBonus;
}

export const events = {
    hitBug, collectBitcoin,
    loseLife, hitBoss, hitMiniBoss
};