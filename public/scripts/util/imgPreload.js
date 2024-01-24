const imagePaths = [
    "./images/char/char.png",
    "./images/char/char-shoot.png",
    "./images/char/char-flying.png",
    "./images/char/char-flyingshoot.png",
    "./images/char/char-hit.png",
    "./images/char/char-collect.png",
    "./images/miniboss/miniboss.png",
    "./images/miniboss/miniboss-hit.png",
    "./images/miniboss/miniboss-shoot.png",
    "./images/miniboss/miniboss-bullet.png",
    "./images/boss/boss.png",
    "./images/boss/boss-hit.png",
    "./images/boss/boss-shoot.png",
    "./images/boss/boss-bullet.png",
    "./images/boss/boss-hp.png",
    "./images/boss/bosshp-hit.png",
    "./images/char/bullet.png",
    "./images/environment/matrixcloud.png",
    "./images/environment/buildings.png",
    "./images/bug/bug.png",
    "./images/bug/bug-hit.png",
    "./images/environment/bitcoin.png",
    "./images/life/life.png",
    "./images/life/life-hit.png",
    "./images/environment/meteorite.png"
];

export function preloadImages() {
    imagePaths.forEach(path => {
        const image = new Image();
        image.src = path;
    });
}