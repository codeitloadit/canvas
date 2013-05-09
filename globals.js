var debug = false;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const BULLET_SPEED = 8;

var canvas, context;

var player;
var playerArgs = {
    x : CANVAS_WIDTH/2,
    y : CANVAS_HEIGHT/2,
    radius : 7,
    lineWidth : 2,
    speed : 4,
    // fill : true,
    color : '#FA58F4'
}

var enemies = [];
var enemyArgs = {
    radius : 12,
    lineWidth : 2,
    speed : 2,
    // fill : true,
    color : '#00BFFF'
}

var bullets = [];
var bulletArgs = {
    radius : 4,
    // lineWidth : 3,
    speed : 8,
    // fill : true,
    color : '#DA81F5'
}
const BULLET_SPACING = 10;
const BULLET_LIFE = 50;

var pressedKeys = [];

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;