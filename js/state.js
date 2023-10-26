const keys = {};

const player = {
    x: 150,
    y: 300,
    width: 0,
    height: 0,
    lastBullet: 0,
    lives: 3,
    lastLostLive: 0
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
    lostLiveInterval: 1000
};

const scene = {
    score: 0,
    killedBugs: 0,
    collectedBitcoins: 0,
    lastCloudSpawn: 0,
    lastBugSpawn: 0,
    lastBitcoinSpawn: 0,
    lastMeteoriteSpawn: 0,
    isGameActive: true,
    isBossFight: false
};

const bossController = {
    health: 100,
    goingUp: true
}