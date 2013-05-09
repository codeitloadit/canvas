var u, d, l, r;
var ship;
var boxes = [];

function init() {
    canvas = document.createElement("canvas");
    canvas.setAttribute('width', CANVAS_WIDTH);
    canvas.setAttribute('height', CANVAS_HEIGHT);
    document.body.appendChild(canvas);

    context = canvas.getContext('2d');

    for (var i = 0; i < 1000; i++) {
        var x = Math.random()*CANVAS_WIDTH;
        var y = Math.random()*CANVAS_HEIGHT;
        var w = 5;
        var h = 10;
        var r = Math.floor(Math.random()*200);
        var g = Math.floor(Math.random()*200);
        var b = Math.floor(Math.random()*200);
        var c = 'rgb(' + r + ',' + g + ',' + b +')';
        var a = Math.floor(Math.random()*80)+10;
        var s = Math.floor(Math.random()*10+2);
        var box = new Box(x, y, w+s, h+s, c, a, s);
        boxes.push(box);
    }

    ship = new Box(400, 300, 50, 30, '#fff', 100, 10);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    draw();
    calculateFPS();
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (u) ship.y -= ship.s;
    if (d) ship.y += ship.s;
    if (l) ship.x -= ship.s;
    if (r) ship.x += ship.s;

    ship.draw(context);

    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        box.x += box.s;
        if (box.x >= 800) {
            box.x = -5;
            box.v = true;
        }

        if (areCirclesColliding(box, ship))
            box.v = false;

        boxes[i].draw(context);
    }
}

function Box(x, y, w, h, c, a, s) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.a = a;
    this.s = s;
    this.v = true;

    this.draw = function(context) {
        if (this.v) {
            context.fillStyle = this.c;
            context.globalAlpha = this.a/100; 
            // context.shadowColor = "#aaa"; 
            // context.shadowOffsetX = 0; 
            // context.shadowOffsetY = 0; 
            // context.shadowBlur = 50; 
            // context.fillRect(this.x, this.y, this.w, this.h);
            context.beginPath();
            context.arc(this.x, this.y, this.w, degToRad(0), degToRad(360), true); 
            context.closePath();
            context.fill();
        }
    };
}

function onKeyDown(e) {
    // console.log(e.keyCode);
    if (e.keyCode == 38) u = true;
    if (e.keyCode == 40) d = true;
    if (e.keyCode == 39) r = true;
    if (e.keyCode == 37) l = true;

    // Toggle FPS Dispay.
    if (e.keyCode == 70) showFPS = !showFPS;
}

function onKeyUp(e) {
    if (e.keyCode == 38) u = false;
    if (e.keyCode == 40) d = false;
    if (e.keyCode == 39) r = false;
    if (e.keyCode == 37) l = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
