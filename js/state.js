const keys = {};

const player = {
    x: 150,
    y: 300,
    width: 0,
    height: 0,
    lastBullet: 0,
    lives: 3
};

const game = {
    speed: 2,
    movingMultiplier: 4,
    bulletMutliplier: 5,
    bugMultiplier: 3,
    bulletInterval: 1000,
    cloudSpawnInterval: 3000,
    bugSpawnInterval: 1000,
    bugKillBonus: 50,
    lostLivePenalty: 200,
    lostLiveInterval: 1000
};

const scene = {
    score: 0,
    lastCloudSpawn: 0,
    lastBugSpawn: 0,
    lastLostLive: 0,
    isGameActive: true
};