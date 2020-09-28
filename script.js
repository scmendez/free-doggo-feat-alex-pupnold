//belayedAlex: https://www.pinterest.com/pin/66991113186037469/
//elCap: https://www.yosemitehikes.com/images/wallpaper/yosemitehikes.com-el-cap-west-1920x1200.jpg
//blueSky: https://i.ytimg.com/vi/0LcLB_JhjxQ/maxresdefault.jpg
//elCapAndTrees: https://wallpapersafari.com/w/REoUqL
//sky2: https://www.decorpad.com/bookmark.htm?bookmarkId=67944
//granite rock: https://www.pngwing.com/en/free-png-nyigl

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
let alexPupnoldWidth = 100;
let alexPupnoldHeight = alexPupnoldWidth * .92;
let alexPupnoldX = 300;
let alexPupnoldY = canvas.height - 95
let alexPupnoldXIncrement = 1.5;

//variables - moving alexPupnold
let isRightArrow = false;
let isLeftArrow = false;

//variables - obstacles
let graniteRockImg = new Image();
graniteRockImg.src = 'images/graniteRock.png';
let graniteRockHeight = 20;
let graniteRockWidth = 20;
let obstaclesArray = [{
    imgElem: graniteRockImg,
    x: 250,
    y: 0,
    height: graniteRockHeight,
    width: graniteRockWidth
}]

//classes
// class ObstacleClass {
//     constructor(imgElem, x, y, width, height) {
//         this.imgElem = imgElem;
//         this.x = x;
//         this.y = y;
//         // this.r = r;
//         this.width = width;
//         this.height = height;
//     }
//     draw() {
//         ctx.drawImage(this.imgElem, this.x, this.y, this.width, this.height)
//         // ctx.beginPath();
//         // ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
//         // ctx.fillStyle = this.color;
//         // ctx.fill();
//         // ctx.closePath();
//     }
// }


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
        alert('oh no, you fell!')
    }
}

const drawObstacle = () => {
    for (let i = 0; i < obstaclesArray.length; i++) {
        // let obstacle = new ObstacleClass(obstaclesArray[i].imgElem, obstaclesArray[i].x, obstaclesArray[i].y, obstaclesArray[i].width, obstaclesArray[i].height)
        // obstacle.draw()
        // obstaclesArray[i].y++

        ctx.drawImage(obstaclesArray[i].imgElem, obstaclesArray[i].x, obstaclesArray[i].y, obstaclesArray[i].width, obstaclesArray[i].height)
        obstaclesArray[i].y++

        if (obstaclesArray[i].y == 150) {
            obstaclesArray.push({
                imgElem: graniteRockImg,
                x: theCapShape.topLeftX + Math.floor((theCapShape.topRightX - theCapShape.topLeftX) * Math.random()),
                y: -10,
                height: graniteRockHeight,
                width: graniteRockWidth
            })
        }
    }
}

const checkObstacleCollision = () => {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if ((alexPupnoldX < obstaclesArray[i].x + obstaclesArray[i].width / 2) && (alexPupnoldX + alexPupnoldWidth > obstaclesArray[i].x) && (alexPupnoldY < obstaclesArray[i].y + obstaclesArray[i].height / 2) && (alexPupnoldY + alexPupnoldHeight / 2 > obstaclesArray[i].y)) {
            console.log('obstacleCheck');
            clearInterval(intervalId);
            alert('oh no, you were hit and fell!')
        }
    }
}

const startGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawSky();
    drawTheCap();
    drawAlexPupnold();
    moveAlexPupnold();
    checkRockBoundaries();
    drawObstacle();
    checkObstacleCollision();
    //update score
}

intervalId = setInterval(() => {
    requestAnimationFrame(startGame)
}, 10)