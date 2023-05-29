let board,
    boardHeight = 640,
    boardWidth = 360,
    context,
    birdWidth =34,
    birdHeight = 24
    birdX = boardWidth/8,
    birdY = boardHeight/2;

/// Bird
let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
}

window.onload = function() {
    board = document.querySelector('.board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d');
    board.style.border = '1px solid black';

    ///For bird
    context.fillStyle = 'transparent';
    context.fillRect(bird.x, bird.y, bird.width, bird.height);
    ///To load images
    let birdImage = new Image();
    birdImage.src = './img/flappybird.png';
    birdImage.onload = function() {
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
    }
}