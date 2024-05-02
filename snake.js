
// Implemented from Jan Bodnar
// http://zetcode.com/javascript/snake/

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;

let DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 50;
let C_HEIGHT = 300;
let C_WIDTH = 300;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);


function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    resizeGame();
    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}

function resizeGame() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Calculate size based on the smaller of the dimensions and cap it at a max size for large displays
    var maxSize = 800; // Maximum size of canvas for very large displays
    var minSize = 300; // Minimum size of canvas for very small displays
    var size = Math.min(maxSize, Math.min(width, height) * 0.9); // Use 90% of the smallest dimension, up to maxSize
    size = Math.max(minSize, size); // Ensure it doesn't go below minSize

    canvas.width = size;
    canvas.height = size;

    DOT_SIZE = Math.floor(size / MAX_RAND); // Adjust dot size based on canvas size
    C_WIDTH = canvas.width;
    C_HEIGHT = canvas.height;
}
window.addEventListener('resize', resizeGame);

function loadImages() {

    head = new Image();
    head.src = 'Snake/head.png';

    ball = new Image();
    ball.src = 'Snake/dot.png';

    apple = new Image();
    apple.src = 'Snake/apple.png';
}

function createSnake() {

    dots = 3;

    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function checkApple() {

    if ((x[0] == apple_x + 10) && (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

function doDrawing() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {
        var scaledSize = DOT_SIZE;


        ctx.drawImage(apple, apple_x, apple_y, scaledSize, scaledSize);

        for (var z = 0; z < dots; z++) {

            if (z == 0) {
                ctx.drawImage(head, x[z], y[z], scaledSize, scaledSize);
            } else {
                ctx.drawImage(ball, x[z], y[z], scaledSize, scaledSize);
            }
        }
    } else {

        gameOver();
    }
}

function gameOver() {

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 40px serif';

    ctx.fillText('Game over', C_WIDTH / 2, C_HEIGHT / 2);
}

function checkApple() {
    console.log('Snake: ', x[0], y[0], 'Apple: ', apple_x, apple_y);
    if ((x[0] == apple_x) && (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('leftBtn').addEventListener('click', function () {
        if (!rightDirection) {
            leftDirection = true;
            upDirection = false;
            downDirection = false;
        }
    });

    document.getElementById('rightBtn').addEventListener('click', function () {
        if (!leftDirection) {
            rightDirection = true;
            upDirection = false;
            downDirection = false;
        }
    });

    document.getElementById('upBtn').addEventListener('click', function () {
        if (!downDirection) {
            upDirection = true;
            rightDirection = false;
            leftDirection = false;
        }
    });

    document.getElementById('downBtn').addEventListener('click', function () {
        if (!upDirection) {
            downDirection = true;
            rightDirection = false;
            leftDirection = false;
        }
    });
});

function move() {
    for (let z = dots; z > 0; z--) {
        x[z] = x[z - 1];
        y[z] = y[z - 1];
    }

    if (leftDirection) {
        x[0] = Math.round((x[0] - DOT_SIZE) / DOT_SIZE) * DOT_SIZE;
    } else if (rightDirection) {
        x[0] = Math.round((x[0] + DOT_SIZE) / DOT_SIZE) * DOT_SIZE;
    } else if (upDirection) {
        y[0] = Math.round((y[0] - DOT_SIZE) / DOT_SIZE) * DOT_SIZE;
    } else if (downDirection) {
        y[0] = Math.round((y[0] + DOT_SIZE) / DOT_SIZE) * DOT_SIZE;
    }
}

function checkCollision() {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {
        inGame = false;
    }

    if (y[0] < 0) {
        inGame = false;
    }

    if (x[0] >= C_WIDTH) {
        inGame = false;
    }

    if (x[0] < 0) {
        inGame = false;
    }
}

function locateApple() {
    let r = Math.floor(Math.random() * (C_WIDTH / DOT_SIZE));
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * (C_HEIGHT / DOT_SIZE));
    apple_y = r * DOT_SIZE;
}

function gameCycle() {

    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function (e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY) && (!rightDirection)) {

        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {

        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {

        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {

        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }
};

document.addEventListener("keydown", function (event) {
    // Check if any of the arrow keys were pressed
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        // Prevent the default action (scrolling) from happening
        event.preventDefault();
    }

    // Add your game logic here to move the snake based on the arrow key pressed
    switch (event.key) {
        case "ArrowUp":
            // Move the snake up
            break;
        case "ArrowDown":
            // Move the snake down
            break;
        case "ArrowLeft":
            // Move the snake left
            break;
        case "ArrowRight":
            // Move the snake right
            break;
    }
});

