const keys = {};

const player = {
    width: 0,
    height: 0,
    lives: 3,
    isAtBottom: false,
    lastLostLife: 0
};

const game = {
    movingMultiplier: 4,
    bulletMutliplier: 5,
    bugMultiplier: 3,
    bitcoinMultiplier: 5,
    meteoriteMultiplier: 5,
    bulletInterval: 1000,
    cloudSpawnInterval: 1500,
    buildingSpawnInterval: 4000,
    bitcoinSpawnInterval: 3000,
    meteoriteSpawnInterval: 800,
    bugKillBonus: 75,
    bitcoinCollectBonus: 125,
    bossHitBonus: 100,
    miniBossHitBonus: 50,
    bossKillBonus: 2000,
    miniBossKillBonus: 1000,
    lostLifeInterval: 1000
};

const scene = {
    timePlayed: 0,
    startTimeSnapshot: 0,
};

const bossController = {
    bossBulletInterval: 1500,
    bossBulletMultiplier: 6,
    loadingBoss: false
}

const miniBossController = {
    miniBossBulletInterval: 3000,
    miniBossBulletMultiplier: 5,
    loadingMiniBoss: false
};

function initState() {
    player.x = 150;
    player.y = 300;
    player.lastBullet = 0;
    player.killedByBoss = false;

    //retain hard mode choice if defeated boss
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