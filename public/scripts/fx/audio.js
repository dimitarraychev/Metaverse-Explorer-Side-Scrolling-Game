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

export function playMusic(type) {
    const music = document.getElementById(musicMap[type]);

    if (game.isAudioEnabled && music.paused) {
        music.volume = 0.4;
        music.play();
    }
}

export function pauseMusic(type) {
    const music = document.getElementById(musicMap[type]);
    music.pause();
}

export function playSoundEffect(effect) {
    const sfx = document.getElementById(sfxMap[effect]);

    if (game.isAudioEnabled) {
        sfx.volume = 0.5;
        sfx.currentTime = 0;
        sfx.play();
    }
}

export function audioControl() {
    const audioBtn = document.querySelector('.audiobutton');

    if (game.isAudioEnabled) {
        game.isAudioEnabled = false;
        audioBtn.classList.add('audiobutton-paused');

        if (!scene.isBossFight) {
            pauseMusic('theme');
        } else {
            pauseMusic('boss');
        }
    } else {
        game.isAudioEnabled = true;
        audioBtn.classList.remove('audiobutton-paused');

        if (!scene.isBossFight) {
            playMusic('theme');
        } else {
            playMusic('boss');
        }
    }
}