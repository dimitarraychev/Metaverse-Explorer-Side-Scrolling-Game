const gameStart = document.querySelector('.game-start');
const startMenu = document.querySelector('.start-menu');
const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gamePoints = document.querySelector('.points');

gameStart.addEventListener('click', onGameStart);

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// game start function
function onGameStart(event) {

    startMenu.classList.add('hide');

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

//key handlers
function onKeyDown(event) {
    keys[event.code] = true;
}

function onKeyUp(event) {
    keys[event.code] = false;
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