var BaseObject = function(args) {
    this.x = args.x || 0;
    this.y = args.y || 0;
    this.fill = args.fill || false;
    this.color = args.color || '#fff';
    this.lineWidth = args.lineWidth || 1;
    this.alpha = args.alpha || 100;
    this.visible = args.visible || true;
    this.angle = args.angle || 0;
    this.speed = args.speed || 5;

    this.frames = 0;

    this.updatePosition = function() {
        if (this.angle > 0) {
            this.x += Math.cos(degToRad(this.angle)) * this.speed;
            this.y += Math.sin(degToRad(this.angle)) * this.speed;
        }
    }

    this.renderBase = function() {
        this.frames += 1;
        this.updatePosition();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.globalAlpha = this.alpha/100; 
        context.lineWidth = this.lineWidth;
    };
}

var RectObject = function(args) {
    BaseObject.call(this, args);
    this.width = args.width || 20;
    this.height = args.height || 20;

    this.render = function() {
        if (this.visible) {
            this.renderBase();
            if (this.fill)
                context.fillRect(this.x, this.y, this.width, this.height);
            else
                context.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}
RectObject.prototype = Object.create(BaseObject.prototype);

var CircleObject = function(args) {
    BaseObject.call(this, args);
    this.radius = args.radius || 10;

    this.render = function() {
        if (this.visible) {
            this.renderBase();
            context.beginPath();
            context.arc(this.x, this.y, this.radius, degToRad(0), degToRad(360), false); 
            if (this.fill)
                context.fill();
            else
                context.stroke();
        }
    }
}
CircleObject.prototype = Object.create(BaseObject.prototype);


var Player = function(args) {
    CircleObject.call(this, args);
    this.radius = args.radius || 10;

    this.handleCollision = function() {
        for (var i = 0; i < enemies.length; i++) {
            if (areCirclesColliding(this, enemies[i]))
                this.color = '#FF0000';
        }
    }
}
Player.prototype = Object.create(CircleObject.prototype);


var Bullet = function(args) {
    CircleObject.call(this, args);
    this.radius = args.radius || 10;

    this.handleCollision = function() {
        for (var i = 0; i < enemies.length; i++) {
            if (areCirclesColliding(this, enemies[i])) {
                delete enemies[i];
                enemies.splice(i, 1);
                indexOfThis = bullets.indexOf(this);
                bullets.splice(indexOfThis, 1);
                delete this;
            }
        }
    }
}
Bullet.prototype = Object.create(CircleObject.prototype);

var Enemy = function(args) {
    CircleObject.call(this, args);
    this.radius = args.radius || 10;
}
Enemy.prototype = Object.create(CircleObject.prototype);



// var Player = function(x, y, radius) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = '#FA58F4';
//     this.alpha = 100;
//     this.visible = true;

//     this.render = function() {
//         if (this.visible) {
//             context.fillStyle = this.color;
//             // if (this.alpha > 0)
//             //     this.alpha -= 1;
//             context.globalAlpha = this.alpha/100; 

//             context.beginPath();

//             // context.moveTo(this.x, this.y); // give the (x,y) coordinates
//             // context.lineTo(this.x - this.radius, this.y + this.radius);
//             // context.lineTo(this.x + this.radius, this.y + this.radius);
//             // context.lineTo(this.x, this.y);


//             context.shadowColor = "#DA81F5"; 
//             context.shadowOffsetX = 0; 
//             context.shadowOffsetY = 0; 
//             context.shadowBlur = 10; 

//             context.arc(this.x, this.y, this.radius, degToRad(0), degToRad(360), false); 

//             context.fill();

//             context.shadowBlur = 0; 

//             // context.strokeStyle = this.color;
//             // context.lineWidth = 3;
//             // context.beginPath();
//             // context.arc(this.x, this.y, this.radius, degToRad(0), degToRad(360), false); 
//             // // context.closePath();
//             // context.stroke();

//             // context.save();
//             // context.translate(this.x, this.y);
//             // context.rotate(1);
//             // context.restore();
//         }
//     };
// };