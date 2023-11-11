const sfxMap = {
    shoot: 'shoot-sound',
    hit: 'hit-sound',
    collect: 'collect-sound',
    enemyhit: 'enemy-hit-sound',
    gameover: 'gameover-music',
    gamewon: 'gamewon-music'
};

const musicMap = {
    boss: 'boss-music',
    theme: 'theme-music'
}

function playMusic(type) {
    const music = document.getElementById(musicMap[type]);

    if (game.isAudioEnabled && music.paused) {
        music.volume = 0.4;
        music.play();
    }
}

function pauseMusic(type) {
    const music = document.getElementById(musicMap[type]);
    music.pause();
}

function playSoundEffect(effect) {
    const sfx = document.getElementById(sfxMap[effect]);

    if (game.isAudioEnabled) {
        sfx.volume = 0.5;
        sfx.currentTime = 0;
        sfx.play();
    }
}

export { playMusic, pauseMusic, playSoundEffect };