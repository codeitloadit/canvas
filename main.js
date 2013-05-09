function init() {
    // Create the canvas element.
    $('button').remove();
    canvas = document.createElement("canvas");
    canvas.setAttribute('width', CANVAS_WIDTH);
    canvas.setAttribute('height', CANVAS_HEIGHT);
    document.body.appendChild(canvas);
    context = canvas.getContext('2d');

    initGame();
    animate();
}

function initGame() {
    player = new Player(playerArgs);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    handleInput();

    if (debug) {
        calculateFPS();
        renderKeyCode();
    }
}

function render() {
    context.fillStyle = '#222';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    player.render();
    player.handleCollision();

    for (var i = 0; i < bullets.length; i++) {
        var b = bullets[i];
        if (b.frames < BULLET_LIFE) {
            // b.alpha -= 1.5;
            // if (b.alpha < 0)
            //     b.alpha = 0;
        } else {
            delete b;
            bullets.splice(i, 1);
        }
        b.render();
        b.handleCollision();
    }

    for (var i = 0; i < enemies.length; i++) {
        var e = enemies[i];
        e.angle = getAngleBetweenPoints(player, e) + 360;
        e.render();

    }
}