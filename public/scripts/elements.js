//add character
function addCharacter() {
    const character = document.createElement('div');
    character.classList.add('character');
    character.style.top = player.y + 'px';
    character.style.left = player.x + 'px';
    gameArea.appendChild(character);

    player.width = character.offsetWidth;
    player.height = character.offsetHeight;
}

//add lives
function addLives() {
    const livesContainer = document.createElement('div');
    livesContainer.classList.add('lives-container');

    for (let index = 0; index < player.lives; index++) {
        let life = document.createElement('div');
        life.classList.add('life');
        livesContainer.appendChild(life);
    }

    gameArea.appendChild(livesContainer);
}

function addAndModifyBugs(timestamp) {
    //add bugs
    if (timestamp - scene.lastBugSpawn > game.bugSpawnInterval + 5000 * Math.random()) {
        const bug = document.createElement('div');
        bug.classList.add('bug');
        bug.x = gameArea.offsetWidth - 60;
        bug.style.left = bug.x + 'px';
        bug.style.top = (gameArea.offsetHeight - 130) * Math.random() + 'px';

        if (bug.style.top.replace('px', '') < 50) bug.style.top = '50px';

        gameArea.appendChild(bug);
        scene.lastBugSpawn = timestamp;
    }

    //modify bug positions
    const bugs = document.querySelectorAll('.bug');
    bugs.forEach(bug => {
        bug.x -= game.speed * game.bugMultiplier;
        bug.style.left = bug.x + 'px';

        if (bug.x + bug.offsetWidth <= 0) {
            bug.remove();
        }
    });
}

function addAndModifyClouds(timestamp) {
    //add clouds
    if (timestamp - scene.lastCloudSpawn > game.cloudSpawnInterval + 20000 * Math.random()) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.x = gameArea.offsetWidth;
        cloud.style.left = cloud.x + 'px';
        cloud.style.top = (gameArea.offsetHeight - 100) * Math.random() + 'px';

        gameArea.appendChild(cloud);
        scene.lastCloudSpawn = timestamp;
    }

    //modify clouds position
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        cloud.x -= game.speed;
        cloud.style.left = cloud.x + 'px';

        if (cloud.x + cloud.offsetWidth <= 0) {
            cloud.remove();
        }
    });
}

function addAndModifyBuildings(timestamp) {
    //add buildings
    if (timestamp - scene.lastBuildingSpawn > game.buildingSpawnInterval + 20000 * Math.random()) {
        const building = document.createElement('div');
        building.classList.add('building');
        building.x = gameArea.offsetWidth;
        building.style.left = building.x + 'px';
        building.style.top = (gameArea.offsetHeight - 340) + 'px';

        gameArea.appendChild(building);
        scene.lastBuildingSpawn = timestamp;
    }

    //modify building position
    const buildings = document.querySelectorAll('.building');
    buildings.forEach(building => {
        building.x -= game.speed;
        building.style.left = building.x + 'px';

        if (building.x + building.offsetWidth <= 0) {
            building.remove();
        }
    });
}

// add and modify bullets functions
function addBullet(player) {
    const bullet = document.createElement('div');

    bullet.classList.add('bullet');
    bullet.y = player.y + player.height / 3 + 5;
    bullet.style.top = bullet.y + 'px';
    bullet.x = player.x + player.width;
    bullet.style.left = bullet.x + 'px';

    gameArea.appendChild(bullet);
}

function modifyBulletsPositions() {
    const bullets = document.querySelectorAll('.bullet');

    bullets.forEach(bullet => {
        bullet.x += game.speed * game.bulletMutliplier;
        bullet.style.left = bullet.x + 'px';

        if (bullet.x + bullet.offsetWidth > gameArea.offsetWidth) {
            bullet.remove();
        }
    });
}

function addAndModifyBitcoins(timestamp) {
    //add bitcoins
    if (timestamp - scene.lastBitcoinSpawn > game.bitcoinSpawnInterval + 5000 * Math.random()) {
        const bitcoin = document.createElement('div');
        bitcoin.classList.add('bitcoin');
        bitcoin.x = gameArea.offsetWidth;
        bitcoin.style.left = bitcoin.x + 'px';
        bitcoin.style.top = (gameArea.offsetHeight - 100) * Math.random() + 'px';

        gameArea.appendChild(bitcoin);
        scene.lastBitcoinSpawn = timestamp;
    }

    //modify bitcoins position
    const bitcoins = document.querySelectorAll('.bitcoin');
    bitcoins.forEach(bitcoin => {
        bitcoin.x -= game.speed * game.bitcoinMultiplier;
        bitcoin.style.left = bitcoin.x + 'px';

        if (bitcoin.x + bitcoin.offsetWidth <= 0) {
            bitcoin.remove();
        }
    });
}

//add and modify miniboss position
function addMiniBoss() {
    miniBossController.loadingMiniBoss = false;
    scene.isMiniBossFight = true;

    const miniBoss = document.createElement('div');
    miniBoss.classList.add('miniboss');
    miniBoss.x = gameArea.offsetWidth - 200;
    miniBoss.y = 50;
    miniBoss.style.left = miniBoss.x + 'px';
    miniBoss.style.top = miniBoss.y + 'px';

    gameArea.appendChild(miniBoss);
}

function modifyMiniBoss() {
    const miniBoss = document.querySelector('.miniboss');

    if (miniBossController.goingUp) {
        miniBoss.y -= game.speed;
        miniBoss.style.top = miniBoss.y + 'px';

        if (miniBoss.y < 0) miniBossController.goingUp = false;
    }

    if (!miniBossController.goingUp) {
        miniBoss.y += game.speed;
        miniBoss.style.top = miniBoss.y + 'px';

        if (miniBoss.y > gameArea.offsetHeight - 200) miniBossController.goingUp = true;
    }
}

function addAndModifyMiniBossBullets(timestamp, miniBoss) {
    //add miniboss bullets
    if (timestamp - miniBossController.miniBossLastBullet > miniBossController.miniBossBulletInterval + 5000 * Math.random()) {
        const miniBossBullet = document.createElement('div');
        miniBossBullet.classList.add('miniboss-bullet');
        miniBossBullet.y = miniBoss.y + miniBoss.offsetHeight - 50;
        miniBossBullet.style.top = miniBossBullet.y + 'px';
        miniBossBullet.x = miniBoss.x - 40;
        miniBossBullet.style.left = miniBossBullet.x + 'px';

        addMiniBossShootEffect();
        gameArea.appendChild(miniBossBullet);
        miniBossController.miniBossLastBullet = timestamp;
    }

    //modify miniboss bullets
    const miniBossBullets = document.querySelectorAll('.miniboss-bullet');
    miniBossBullets.forEach(miniBossBullet => {
        miniBossBullet.x -= game.speed * miniBossController.miniBossBulletMultiplier;
        miniBossBullet.style.left = miniBossBullet.x + 'px';

        if (miniBossBullet.x + miniBossBullet.offsetWidth <= 0) {
            miniBossBullet.remove();
        }
    });
}

//add and modify boss position
function addBoss() {
    bossController.loadingBoss = false;
    scene.isBossFight = true;
    const boss = document.createElement('div');
    boss.classList.add('boss');
    boss.x = gameArea.offsetWidth - 400;
    boss.y = gameArea.offsetHeight / 4;
    boss.style.left = boss.x + 'px';
    boss.style.top = boss.y + 'px';

    gameArea.appendChild(boss);
}

function modifyBoss() {
    const boss = document.querySelector('.boss');

    if (bossController.goingUp) {
        boss.y -= game.speed;
        boss.style.top = boss.y + 'px';

        if (boss.y < 0) bossController.goingUp = false;
    }

    if (!bossController.goingUp) {
        boss.y += game.speed;
        boss.style.top = boss.y + 'px';

        if (boss.y > gameArea.offsetHeight - 320) bossController.goingUp = true;
    }
}

function addAndModifyMeteorites(timestamp) {
    //add metorites
    if (timestamp - scene.lastMeteoriteSpawn > game.meteoriteSpawnInterval + 5000 * Math.random()) {
        const meteorite = document.createElement('div');
        meteorite.classList.add('meteorite');
        meteorite.x = gameArea.offsetWidth;
        meteorite.style.left = meteorite.x + 'px';
        meteorite.style.top = (gameArea.offsetHeight - 100) * Math.random() + 'px';

        gameArea.appendChild(meteorite);
        scene.lastMeteoriteSpawn = timestamp;
    }

    //modify meteorites position
    const meteorites = document.querySelectorAll('.meteorite');
    meteorites.forEach(meteorite => {
        meteorite.x -= game.speed * game.meteoriteMultiplier;
        meteorite.style.left = meteorite.x + 'px';

        if (meteorite.x + meteorite.offsetWidth <= 0) {
            meteorite.remove();
        }
    });
}

function addAndModifyBossBullets(timestamp, boss) {
    //add boss bullets
    if (timestamp - bossController.bossLastBullet > bossController.bossBulletInterval + 5000 * Math.random()) {
        const bossBullet = document.createElement('div');
        bossBullet.classList.add('boss-bullet');
        bossBullet.y = boss.y + boss.offsetHeight - 100;
        bossBullet.style.top = bossBullet.y + 'px';
        bossBullet.x = boss.x - 100;
        bossBullet.style.left = bossBullet.x + 'px';

        addBossShootEffect();
        gameArea.appendChild(bossBullet);
        bossController.bossLastBullet = timestamp;
    }

    //modify boss bullets
    const bossBullets = document.querySelectorAll('.boss-bullet');
    bossBullets.forEach(bossBullet => {
        bossBullet.x -= game.speed * bossController.bossBulletMultiplier;
        bossBullet.style.left = bossBullet.x + 'px';

        if (bossBullet.x + bossBullet.offsetWidth <= 0) {
            bossBullet.remove();
        }
    });
}