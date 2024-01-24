export function resetState() {
    player.x = 150;
    player.y = 300;
    player.lastBullet = 0;
    player.killedByBoss = false;

    const hardModeSwitch = document.getElementById('switch');
    if (scene.defeatedBoss === true && hardModeSwitch.checked === true) {
        game.isHardMode = true;
    } else {
        game.isHardMode = false;
    }

    game.speed = 2;
    game.bugSpawnInterval = 1000;

    scene.score = 0;
    scene.runStartTime = 0;
    scene.runEndTime = 0;
    scene.takenSnapshot = false;
    scene.killedBugs = 0;
    scene.collectedBitcoins = 0;
    scene.lastCloudSpawn = 0;
    scene.lastBuildingSpawn = 0;
    scene.lastBugSpawn = 0;
    scene.lastBitcoinSpawn = 0;
    scene.lastMeteoriteSpawn = 0;
    scene.isGameActive = true;
    scene.isBossFight = false;
    scene.isMiniBossFight = false;
    scene.defeatedBoss = false;
    scene.defeatedMiniBoss = false;
    scene.metBoss = false;

    bossController.health = 100;
    bossController.goingUp = true;
    bossController.bossLastBullet = 0;

    miniBossController.health = 25;
    miniBossController.goingUp = true;
    miniBossController.miniBossLastBullet = 0;
}