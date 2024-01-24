export function removeAllElements() {
    const clouds = document.querySelectorAll('.cloud');
    const buildings = document.querySelectorAll('.building');
    const bugs = document.querySelectorAll('.bug');
    const bullets = document.querySelectorAll('.bullet');
    const bitcoins = document.querySelectorAll('.bitcoin');

    clouds.forEach(cloud => cloud.remove());
    buildings.forEach(building => building.remove());
    bugs.forEach(bug => bug.remove());
    bullets.forEach(bullet => bullet.remove());
    bitcoins.forEach(bitcoin => bitcoin.remove());

    if (scene.defeatedBoss || player.killedByBoss) {
        const meteorites = document.querySelectorAll('.meteorite');
        const boss = document.querySelector('.boss');
        const bossAllHPBars = document.querySelectorAll('.boss-hp');
        const bossBullets = document.querySelectorAll('.boss-bullet');

        meteorites.forEach(meteorite => meteorite.remove());
        boss.remove();
        bossAllHPBars.forEach(bar => bar.remove());
        bossBullets.forEach(bossBullet => bossBullet.remove());
    }

    if (scene.isMiniBossFight) {
        const miniBoss = document.querySelector('.miniboss');
        const miniBossBullets = document.querySelectorAll('.miniboss-bullet');
        const miniBossAllHPBars = document.querySelectorAll('.boss-hp');

        miniBoss.remove();
        miniBossBullets.forEach(miniBossBullet => miniBossBullet.remove());
        miniBossAllHPBars.forEach(bar => bar.remove());
    }

    if (scene.defeatedBoss) {
        const displayedLives = Array.from(document.querySelectorAll('.life')).length;
        if (displayedLives > 0) {
            for (let i = 0; i < displayedLives; i++) {
                const extraLife = document.querySelector('.life');
                extraLife.remove();
            }
        }
    }
}