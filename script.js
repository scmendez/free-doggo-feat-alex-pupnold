//belayedAlex: https://www.pinterest.com/pin/66991113186037469/
//elCap: https://www.yosemitehikes.com/images/wallpaper/yosemitehikes.com-el-cap-west-1920x1200.jpg
//blueSky: https://i.ytimg.com/vi/0LcLB_JhjxQ/maxresdefault.jpg
//elCapAndTrees: https://wallpapersafari.com/w/REoUqL
//sky2: https://www.decorpad.com/bookmark.htm?bookmarkId=67944

//canvas + DOM
let canvas = document.querySelector('canvas');
canvas.style.border = '1px solid #000';

//paintbrush
let ctx = canvas.getContext('2d');

//variables - overall
let intervalId = 0;

let score = 0;

//variables - drawSky
let skyBackgroundImg = new Image();
skyBackgroundImg.src = 'images/sky2.png';
let skyY = -skyBackgroundImg.height + canvas.height;

//variables  drawTheCap
let theCapImg = new Image();
theCapImg.src = 'images/elCap2Narrow.jpg';
let theCapShape = {
    bottomLeftX: 100,
    topLeftX: 150,
    topRightX: 550,
    bottomRightX: 600,
}
let theCapY = -theCapImg.height + canvas.height;

//variables - alexPupnold
let alexPupnoldImg = new Image();
alexPupnoldImg.src = 'images/belayedAlexRight.png';
let alexPupnoldHeight = 100;
let alexPupnoldWidth = 100;
let alexPupnoldX = 300;
let alexPupnoldY = canvas.height - 95
let alexPupnoldXIncrement = 1.5;

//variables - moving alexPupnold
let isRightArrow = false;
let isLeftArrow = false;



//classes
class drawObstacles {
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y
    }
    // draw() {

    // }
}


//event listeners
document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowRight' || event.keyCode == 39) {
        isRightArrow = true;
        isLeftArrow = false;
    } else if (event.key == 'ArrowLeft' || event.keyCode == 37) {
        isRightArrow = false;
        isLeftArrow = true;
    }
})

document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
})


//functions

const drawSky = () => {
    ctx.drawImage(skyBackgroundImg, 0, skyY, canvas.width, skyBackgroundImg.height)

    skyY += .04;
}

const drawTheCap = () => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(theCapShape.bottomLeftX, 500);
    ctx.lineTo(theCapShape.topLeftX, 0);
    ctx.lineTo(theCapShape.topRightX, 0);
    ctx.lineTo(theCapShape.bottomRightX, 500);
    ctx.lineTo(theCapShape.bottomLeftX, 500);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(theCapImg, 0, theCapY)
    ctx.restore();

    theCapShape.bottomLeftX += .01;
    theCapShape.topLeftX += .01;
    theCapShape.topRightX -= .01;
    theCapShape.bottomRightX -= .01;

    theCapY += .07
}

const drawAlexPupnold = () => {
    ctx.drawImage(alexPupnoldImg, alexPupnoldX, alexPupnoldY, alexPupnoldHeight, alexPupnoldWidth)
}

const moveAlexPupnold = () => {
    if (isRightArrow) {
        alexPupnoldX += alexPupnoldXIncrement
        alexPupnoldImg.src = 'images/belayedAlexRight.png';
    } else if (isLeftArrow) {
        alexPupnoldX -= alexPupnoldXIncrement
        alexPupnoldImg.src = 'images/belayedAlexLeft.png';
    }
}

const checkRockBoundaries = () => {
    if (alexPupnoldX <= theCapShape.bottomLeftX - 35 || ((alexPupnoldX + alexPupnoldWidth) >= theCapShape.bottomRightX + 35)) {
        clearInterval(intervalId);
        alert('oh no, you died!')
    }
}

const startGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawSky();
    drawTheCap();
    drawAlexPupnold();
    moveAlexPupnold();
    checkRockBoundaries();
    //update score
    //draw obstacles
}

intervalId = setInterval(() => {
    requestAnimationFrame(startGame)
}, 10)