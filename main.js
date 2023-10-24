const gameStart = document.querySelector('.start-menu');
const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gamePoints = document.querySelector('.points');

gameStart.addEventListener('click', onGameStart);

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

const keys = {};

const player = {
    x: 150,
    y: 100,
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

// game start function
function onGameStart(event) {

    gameStart.classList.add('hide');

    // render character
    const character = document.createElement('div');
    character.classList.add('character');
    character.style.top = player.y + 'px';
    character.style.left = player.x + 'px';
    gameArea.appendChild(character);

    player.width = character.offsetWidth;
    player.height = character.offsetHeight;

    // render lives
    const livesContainer = document.createElement('div');
    livesContainer.classList.add('lives-container');

    for (let index = 0; index < player.lives; index++) {
        let live = document.createElement('div');
        live.classList.add('live');
        livesContainer.appendChild(live);
    }

    gameArea.appendChild(livesContainer);

    //start game loop
    window.requestAnimationFrame(gameAction);
}

//game loop function
function gameAction(timestamp) {
    const character = document.querySelector('.character');
    const bugs = document.querySelectorAll('.bug');

    //increment score count
    scene.score += 0.1;

    //proceed to next levels
    if (scene.score > 500) proceedToNextLevel();

    //apply gravitation
    const isInAir = (player.y + player.height) <= gameArea.offsetHeight;
    if (isInAir) player.y += game.speed;

    //add bugs and clouds
    addAndModifyBugs(timestamp);
    addAndModifyClouds(timestamp);

    //modify bullets positions
    const bullets = document.querySelectorAll('.bullet');
    bullets.forEach(bullet => {
        bullet.x += game.speed * game.bulletMutliplier;
        bullet.style.left = bullet.x + 'px';

        if (bullet.x + bullet.offsetWidth > gameArea.offsetWidth) {
            bullet.remove();
        }
    });

    //register user input
    if (keys.ArrowUp && player.y > 0 || keys.KeyW && player.y > 0) {
        character.classList.add('character-flying');
        player.y -= game.speed * game.movingMultiplier;
    } else {
        character.classList.remove('character-flying');
    }

    if (keys.ArrowDown && isInAir || keys.KeyS && isInAir) {
        player.y += game.speed * game.movingMultiplier;
    }

    if (keys.ArrowLeft && player.x > 0 || keys.KeyA && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }

    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth || keys.KeyD && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }

    if (keys.Space && timestamp - player.lastBullet > game.bulletInterval) {
        character.classList.add('character-shoot');
        addBullet(player);
        player.lastBullet = timestamp;
    } else {
        character.classList.remove('character-shoot');
    }

    //detect collisions
    bugs.forEach(bug => {
        if (isCollision(character, bug)) loseLive(timestamp);

        bullets.forEach(bullet => {
            if (isCollision(bullet, bug)) {
                scene.score += game.bugKillBonus;
                bullet.remove();
                bug.remove();
            }
        })
    });

    //apply movement
    character.style.top = player.y + 'px';
    character.style.left = player.x + 'px';

    //apply score
    gamePoints.textContent = Math.trunc(scene.score);

    if (scene.isGameActive) window.requestAnimationFrame(gameAction);
}

function addAndModifyBugs(timestamp) {
    //add bugs
    if (timestamp - scene.lastBugSpawn > game.bugSpawnInterval + 5000 * Math.random()) {
        const bug = document.createElement('div');
        bug.classList.add('bug');
        bug.x = gameArea.offsetWidth - 60;
        bug.style.left = bug.x + 'px';
        bug.style.top = (gameArea.offsetHeight - 100) * Math.random() + 'px';

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
        cloud.style.top = (gameArea.offsetHeight - 200) * Math.random() + 'px';

        gameArea.appendChild(cloud);
        scene.lastCloudSpawn = timestamp;
    }

    //modify clouds position
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        cloud.x -= game.speed;
        cloud.style.left = cloud.x + 'px';

        if (cloud.x + clouds.offsetWidth <= 0) {
            cloud.remove();
        }
    });
}

function addBullet(player) {
    const bullet = document.createElement('div');

    bullet.classList.add('bullet');
    bullet.y = player.y + player.height / 3 + 5;
    bullet.style.top = bullet.y + 'px';
    bullet.x = player.x + player.width;
    bullet.style.left = bullet.x + 'px';

    gameArea.appendChild(bullet);
}

//key handlers
function onKeyDown(event) {
    keys[event.code] = true;
}

function onKeyUp(event) {
    keys[event.code] = false;
}

function isCollision(firstElement, secondElement) {
    let firstRect = firstElement.getBoundingClientRect();
    let secondRect = secondElement.getBoundingClientRect();

    return !(firstRect.top > secondRect.bottom ||
        firstRect.bottom < secondRect.top ||
        firstRect.right < secondRect.left ||
        firstRect.left > secondRect.right);
}

function loseLive(timestamp) {
    if (timestamp - scene.lastLostLive > game.lostLiveInterval) {

        const currLive = document.querySelector('.live');
        currLive.remove();
        player.lives--;

        scene.score -= game.lostLivePenalty;
        if (scene.score < 0) scene.score = 0;

        scene.lastLostLive = timestamp;

        if (player.lives < 1) gameOverAction();
    }
}

function proceedToNextLevel() {
    if (scene.score > 500 && scene.score < 1000) {
        game.speed = 2.5;
    } else if (scene.score > 1000 && scene.score < 2000) {
        game.speed = 3;
    } else if (scene.score > 2000 && scene.score < 3000) {
        game.speed = 3.5;
    } else if (scene.score > 3000) {
        game.speed = 4;
    }
}

function gameOverAction() {
    scene.isGameActive = false;
    gameOver.classList.remove('hide');
}