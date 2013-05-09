$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function onKeyDown(e) {
    if (!isKeyDown(e.keyCode))
        pressedKeys.push(e.keyCode);

    if (e.keyCode == 16) createEnemy();

    if (e.keyCode == 27) debug = !debug;
}

function onKeyUp(e) {
    pressedKeys.splice(pressedKeys.indexOf(e.keyCode), 1);
}

function isKeyDown(key) {
    return pressedKeys.indexOf(key) >= 0;
}
    
function renderKeyCode() {
    if (pressedKeys.length > 0) {
        context.fillStyle = "#fff";
        context.globalAlpha = 1;
        context.font = 'bold 20px Arial';
        context.fillText(pressedKeys[pressedKeys.length - 1], CANVAS_WIDTH-22, 16);
    }
}

function handleInput() {

    if (isKeyDown(KEY_D)) {
        if (isKeyDown(KEY_W))
            player.angle = 315;
        else if (isKeyDown(KEY_S))
            player.angle = 45;
        else
            player.angle = 360;
    }

    if (isKeyDown(KEY_A) && !isKeyDown(KEY_D)) {
        if (isKeyDown(KEY_W))
            player.angle = 225;
        else if (isKeyDown(KEY_S))
            player.angle = 135;
        else
            player.angle = 180;
    }

    if (isKeyDown(KEY_W) && !isKeyDown(KEY_A) && !isKeyDown(KEY_D))
        player.angle = 270;

    if (isKeyDown(KEY_S) && !isKeyDown(KEY_A) && !isKeyDown(KEY_D))
        player.angle = 90;

    if (!isKeyDown(KEY_S) && !isKeyDown(KEY_A) && !isKeyDown(KEY_D) && !isKeyDown(KEY_W))
        player.angle = -1;

    if (isKeyDown(KEY_RIGHT)) {
        if (isKeyDown(KEY_UP))
            createBullet(315);
        else if (isKeyDown(KEY_DOWN))
            createBullet(45);
        else
            createBullet(360);
    }

    if (isKeyDown(KEY_LEFT) && !isKeyDown(KEY_RIGHT)) {
        if (isKeyDown(KEY_UP))
            createBullet(225);
        else if (isKeyDown(KEY_DOWN))
            createBullet(135);
        else
            createBullet(180);
    }

    if (isKeyDown(KEY_UP) && !isKeyDown(KEY_LEFT) && !isKeyDown(KEY_RIGHT))
        createBullet(270);

    if (isKeyDown(KEY_DOWN) && !isKeyDown(KEY_LEFT) && !isKeyDown(KEY_RIGHT))
        createBullet(90);
}

function createBullet(angle) {
    if (bullets.length == 0 || bullets.length > 0 && bullets[bullets.length-1].frames >= BULLET_SPACING) {
        var b = new Bullet($.extend(bulletArgs, { x: player.x, y: player.y, angle: angle }));
        bullets.push(b);
    }
}

function createEnemy() {
    var x = Math.floor(Math.random()*CANVAS_WIDTH);
    var y = Math.floor(Math.random()*CANVAS_HEIGHT);
    var e = new CircleObject($.extend(enemyArgs, { x: x, y: y }));
    enemies.push(e);
}

