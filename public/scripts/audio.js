const themeMusic = document.getElementById('theme-music');
const shootSound = document.getElementById('shoot-sound');
const hitSound = document.getElementById('hit-sound');
const enemyHitSound = document.getElementById('enemy-hit-sound');
const collectSound = document.getElementById('collect-sound');
const bossMusic = document.getElementById('boss-music');
const gameOverMusic = document.getElementById('gameover-music');
const gameWonMusic = document.getElementById('gamewon-music');

function playThemeMusic() {
    if (game.isAudioEnabled && themeMusic.paused) {
        themeMusic.volume = 0.3;
        themeMusic.play();
    }
}

function pauseThemeMusic() {
        themeMusic.pause();
}

function playShootSound() {
    if (game.isAudioEnabled) {
        shootSound.volume = 0.4;
        shootSound.currentTime = 0;
        shootSound.play();
    }
}

function playHitSound() {
    if (game.isAudioEnabled) {
        hitSound.volume = 0.6;
        hitSound.currentTime = 0;
        hitSound.play();
    }
}

function playEnemyHitSound() {
    if (game.isAudioEnabled) {
        enemyHitSound.volume = 0.5;
        enemyHitSound.currentTime = 0;
        enemyHitSound.play();
    }
}

function playCollectSound() {
    if (game.isAudioEnabled) {
        collectSound.volume = 0.2;
        collectSound.currentTime = 0;
        collectSound.play();
    }
}

function playBossMusic() {
    if (game.isAudioEnabled && bossMusic.paused) {
        bossMusic.volume = 0.4;
        bossMusic.currentTime = 0;
        bossMusic.play();
    }
}

function pauseBossMusic() {
        bossMusic.pause();
}

function playGameOverMusic() {
    if (game.isAudioEnabled) {
        gameOverMusic.volume = 0.4;
        gameOverMusic.currentTime = 0;
        gameOverMusic.play();
    }
}

function playGameWonMusic() {
    if (game.isAudioEnabled) {
        gameWonMusic.volume = 0.4;
        gameWonMusic.currentTime = 0;
        gameWonMusic.play();
    }
}