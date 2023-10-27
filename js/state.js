const keys = {};

const player = {
    x: 150,
    y: 300,
    width: 0,
    height: 0,
    lastBullet: 0,
    lives: 3,
    lastLostLife: 0,
    killedByBoss: false,
    isAtBottom: false
};

const game = {
    speed: 2,
    movingMultiplier: 4,
    bulletMutliplier: 5,
    bugMultiplier: 3,
    bitcoinMultiplier: 5,
    meteoriteMultiplier: 5,
    bulletInterval: 1000,
    cloudSpawnInterval: 2500,
    bugSpawnInterval: 1000,
    bitcoinSpawnInterval: 3000,
    meteoriteSpawnInterval: 1000,
    bugKillBonus: 75,
    bitcoinCollectBonus: 125,
    bossHitBonus: 100,
    bossKillbonus: 2000,
    lostLifeInterval: 1500
};

const scene = {
    score: 0,
    killedBugs: 0,
    collectedBitcoins: 0,
    timePlayed: 0,
    lastCloudSpawn: 0,
    lastBugSpawn: 0,
    lastBitcoinSpawn: 0,
    lastMeteoriteSpawn: 0,
    isGameActive: true,
    isBossFight: false,
    defeatedBoss: false,
};

const bossController = {
    health: 100,
    goingUp: true,
    bossLastBullet: 2000,
    bossBulletInterval: 2000,
    bossBulletMultiplier: 6,
    loadingBoss: false
}