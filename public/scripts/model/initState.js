const keys = {};

const player = {
    width: 0,
    height: 0,
    lives: 5,
    isAtBottom: false,
    lastLostLife: 0
};

const game = {
    movingMultiplier: 4,
    bulletMutliplier: 5,
    bugMultiplier: 3,
    bitcoinMultiplier: 6,
    meteoriteMultiplier: 5,
    bulletInterval: 800,
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
    lostLifeInterval: 1000,
    isAudioEnabled: true
};

const scene = {
    timePlayed: 0,
    startTimeSnapshot: 0,
    highScore: 0
};

const bossController = {
    bossBulletInterval: 1500,
    bossBulletMultiplier: 7,
    loadingBoss: false
}

const miniBossController = {
    miniBossBulletInterval: 2500,
    miniBossBulletMultiplier: 5,
    loadingMiniBoss: false
};