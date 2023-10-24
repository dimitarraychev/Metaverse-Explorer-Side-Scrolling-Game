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