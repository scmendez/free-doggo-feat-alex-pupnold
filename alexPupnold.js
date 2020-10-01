//global variables - drawAlexPupnold
let alexPupnoldImg = new Image();
alexPupnoldImg.src = "images/belayedAlexRight.png";
let alexPupnold = {
    x: 300,
    y: 405,
    width: 100,
    height: 92,
};

//global variables - moveAlexPupnold
let alexPupnoldXIncrement = 1.5;
let isRightArrow = false;
let isLeftArrow = false;

document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowRight" || event.keyCode == 39) {
        isRightArrow = true;
        isLeftArrow = false;
    } else if (event.key == "ArrowLeft" || event.keyCode == 37) {
        isRightArrow = false;
        isLeftArrow = true;
    }
});

document.addEventListener("keyup", (event) => {
    isRightArrow = false;
    isLeftArrow = false;
});

const drawAlexPupnold = () => {
    ctx.drawImage(
        alexPupnoldImg,
        alexPupnold.x,
        alexPupnold.y,
        alexPupnold.width,
        alexPupnold.height
    );
    if (alexPupnold.y + alexPupnold.height / 2 < theCapY) {
        console.log('Called')
        gameOverWin();
    }
};

const moveAlexPupnold = () => {
    if (isRightArrow) {
        alexPupnold.x += alexPupnoldXIncrement;
        alexPupnoldImg.src = "images/belayedAlexRight.png";
    } else if (isLeftArrow) {
        alexPupnold.x -= alexPupnoldXIncrement;
        alexPupnoldImg.src = "images/belayedAlexLeft.png";
    }
};