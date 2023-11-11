function isCollision(firstElement, secondElement) {
    const firstRect = firstElement.getBoundingClientRect();
    const secondRect = secondElement.getBoundingClientRect();

    //moving the collisions further inside for the character and boss
    const character = document.querySelector('.character');
    const boss = document.querySelector('.boss');
    const miniBoss = document.querySelector('.miniboss');
    const charException = firstElement === character ? 30 : 0;
    let bossException = 10;
    if (secondElement === boss) bossException = 50;
    if (secondElement === miniBoss) bossException = 20;

    return !(firstRect.top + charException > secondRect.bottom - bossException ||
        firstRect.bottom - charException < secondRect.top + bossException ||
        firstRect.right - charException < secondRect.left + bossException ||
        firstRect.left + charException > secondRect.right - bossException);
}

//detect collisions
function collisionDetection(character, miniBoss, boss) {
    const bugs = document.querySelectorAll('.bug');
    const bullets = document.querySelectorAll('.bullet');
    const bitcoins = document.querySelectorAll('.bitcoin');
    const meteorites = document.querySelectorAll('.meteorite');
    const bossBullets = document.querySelectorAll('.boss-bullet');
    const miniBossBullets = document.querySelectorAll('.miniboss-bullet');

    let collision = {
        element: '',
        isBug: false,
        isBitcoin: false
    };

    bugs.forEach(bug => {
        if (isCollision(character, bug)) collision.element = character;

        bullets.forEach(bullet => {
            if (isCollision(bullet, bug)) {
                bullet.remove();
                collision.element = bug;
                collision.isBug = true;
            }
        });
    });

    bitcoins.forEach(bitcoin => {
        if (isCollision(character, bitcoin)) {
            bitcoin.remove();
            collision.element = bitcoin;
            collision.isBitcoin = true;
        }
    });

    //detect collisions in minibossfight
    if (scene.isMiniBossFight) {
        bullets.forEach(bullet => {
            if (isCollision(bullet, miniBoss)) {
                bullet.remove();
                collision.element = miniBoss;
            }
        });

        miniBossBullets.forEach(miniBossBullet => {
            if (isCollision(character, miniBossBullet)) {
                miniBossBullet.remove();
                collision.element = character;
            }
        });
    }

    //detect collisions in boss fight
    if (scene.isBossFight) {

        if (isCollision(character, boss)) collision.element = character;

        bullets.forEach(bullet => {
            if (isCollision(bullet, boss)) {
                bullet.remove();
                collision.element = boss;
            }
        });

        meteorites.forEach(meteorite => {
            if (isCollision(character, meteorite)) collision.element = character;
        });

        bossBullets.forEach(bossBullet => {
            if (isCollision(character, bossBullet)) {
                bossBullet.remove();
                collision.element = character;
            }
        });
    }

    return collision;
}

export { collisionDetection };