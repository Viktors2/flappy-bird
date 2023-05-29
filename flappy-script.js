let board,
    boardHeight = 640,
    boardWidth = 360,
    context,
    birdWidth = 34,
    birdHeight = 24,
    birdX = boardWidth / 8,
    birdY = boardHeight / 2,
    birdImg;

/// Bird
let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

// Similar for pipe
let pipeArray = [];
let pipeWidth = 64; // width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//phisics  
let velocityX = -2, //will move pipes 2px to the left every frame
    velocityY = 0, //will move bird 
    gravity = 0.2 ; //will increase velocityY every frame

let gameOver = false;
let score = 0;

document.addEventListener("keydown", birdMoves) // when key is pressed

window.onload = function() {
    board = document.querySelector(".board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used for drawing on the board

    // Load bird image
    birdImg = new Image();
    birdImg.src = "./img/flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    // Load pipe images
    topPipeImg = new Image();
    topPipeImg.src = "./img/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./img/bottompipe.png";

    requestAnimationFrame(upd);
    setInterval(placePipe, 2000); // 2 seconds
}
function upd() {
    requestAnimationFrame(upd);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height); // clear the board
    velocityY += gravity; 
    bird.y = Math.max(bird.y + velocityY, 0); // 
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y + bird.height >= board.height) {
        gameOver = true;
    }
    // Draw pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        
        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            pipe.passed = true;
            score+= 0.5; // 0.5 for each pipe
        }
        
        if (collision(bird, pipe)) {
            gameOver = true;
        }
    }
    ///scores
    context.font = "30px Arial";
    context.fillText(score, 5, 45);
    context.fillStyle = "green";
}

function placePipe() {
    if (gameOver) {
        return;
    }
let randomPipeY = pipeY - pipeHeight/4 - Math.random() * (pipeHeight/2);
let openingSpace = boardHeight / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
}
    pipeArray.push(bottomPipe);
}

function birdMoves(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        velocityY = -6;
    }
}

function collision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}