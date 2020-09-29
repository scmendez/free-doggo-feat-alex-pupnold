//belayedAlex: https://www.pinterest.com/pin/66991113186037469/
//elCap: https://www.yosemitehikes.com/images/wallpaper/yosemitehikes.com-el-cap-west-1920x1200.jpg
//elCapAndTrees: https://wallpapersafari.com/w/REoUqL
//sky2: https://www.decorpad.com/bookmark.htm?bookmarkId=67944
//granite rock: https://www.pngwing.com/en/free-png-nyigl
//dog bowl: https://www.shutterstock.com/image-photo/dog-treats-bowl-on-wooden-table-443930170
//dog treat: https://eatthegains.com/peanut-butter-banana-dog-treats/

//global variables - overall
let canvas;
let ctx;
let intervalId;
let score = 0;

//global variables - drawSky
let skyBackgroundImg = new Image();
skyBackgroundImg.src = 'images/sky2.png';
let skyY = -skyBackgroundImg.height + 500

//global variables - drawTheCap
let theCapImg = new Image();
theCapImg.src = 'images/elCap4.png';
let theCapShape = {
    bottomLeftX: 100,
    topLeftX: 150,
    topRightX: 550,
    bottomRightX: 600,
};
let theCapY = -theCapImg.height + 500;

let dogBowlImg = new Image();
dogBowlImg.src = 'images/dogBowl.png';
let dogBowl = {
    width: 50,
    height: 40
}

//global variables - drawAlexPupnold
let alexPupnoldImg = new Image();
alexPupnoldImg.src = 'images/belayedAlexRight.png';
let alexPupnold = {
    x: 300,
    y: 405,
    width: 100,
    height: 92
};

//global variables - moveAlexPupnold
let alexPupnoldXIncrement = 1.5;
let isRightArrow = false;
let isLeftArrow = false;

//global variables - drawObstacle
let graniteRockImg = new Image();
graniteRockImg.src = 'images/graniteRock.png';
let graniteRockHeight = 20;
let graniteRockWidth = 20;
let obstaclesArray = [{
    imgElem: graniteRockImg,
    x: 250,
    y: 0,
    width: graniteRockWidth,
    height: graniteRockHeight,
}];

//global variables - drawTreat
let dogTreatImg = new Image();
dogTreatImg.src = 'images/dogTreat.png';
let dogTreatHeight = 20;
let dogTreatWidth = 30;
let dogTreatsArray = [{
    imgElem: dogTreatImg,
    x: 200,
    y: -50,
    width: dogTreatWidth,
    height: dogTreatHeight,
}];

//splash screen
let mainDOM;
let canvasDOM;

let startBtn = document.querySelector('#startButton')
startBtn.addEventListener('click', () => {
    startGameSetup();
});

//splash screen to game screen
const startGameSetup = () => {
    mainDOM = document.querySelector('#mainContainer');

    let splashScreenDOM = document.querySelector('#splashScreen');

    mainDOM.removeChild(splashScreenDOM);

    canvasDOM = document.createElement('div');
    canvasDOM.innerHTML = `<canvas width = "700" height = "500"> </canvas>`

    mainDOM.appendChild(canvasDOM);

    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    intervalId = setInterval(() => {
        requestAnimationFrame(startGame)
    }, 10)
}

//game screen to game over loss screen
const gameOverLoss = () => {
    clearInterval(intervalId);

    score = 0;
    theCapY = -theCapImg.height + 500;
    alexPupnold = {
        x: 300,
        y: 405,
        width: 100,
        height: 92
    };
    obstaclesArray = [{
        imgElem: graniteRockImg,
        x: 250,
        y: 0,
        width: graniteRockWidth,
        height: graniteRockHeight,
    }];
    dogTreatsArray = [{
        imgElem: dogTreatImg,
        x: 250,
        y: -50,
        width: dogTreatHeight,
        height: dogTreatWidth,
    }];

    mainDOM.removeChild(canvasDOM);

    let gameOverLossDOM = document.createElement('div');
    gameOverLossDOM.setAttribute('id', 'splashScreen');
    gameOverLossDOM.innerHTML = `<img src="images/gameOverText.png" alt="Game Over"> <p>At least all dogs go to heaven...right?</p> <button id="playAgainButton" class="play-again-button">That was just practice, I wanna try again</button>`
    gameOverLossDOM.classList.add('game-over-loss');

    mainDOM.appendChild(gameOverLossDOM);

    let playAgainBtn = document.querySelector('#playAgainButton')
    playAgainBtn.addEventListener('click', () => {
        startGameSetup();
    });
}

//game screen to game over win screen
const gameOverWin = () => {
    clearInterval(intervalId);

    congratsTextDOM = document.createElement('div');
    congratsTextDOM.innerHTML = `<img src="images/gameOverWin.gif" alt="You did it!">`
    congratsTextDOM.classList.add('game-over-win');

    mainDOM.appendChild(congratsTextDOM);
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

    skyY += 0.5;

    ctx.font = "20px Arial"
    ctx.fillText('Score: ' + Math.round(score), 20, 30);
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

    theCapY += 0.5;
    score += .1;

    if (theCapShape.topLeftX == 325 && theCapShape.topRightX == 375) {
        ctx.closePath();
    }

    ctx.drawImage(dogBowlImg, theCapShape.topLeftX + 50, theCapY + 10, dogBowl.width, dogBowl.height);
    if ((alexPupnold.x < theCapShape.topLeftX + 50 + dogBowl.width / 2) && (alexPupnold.x + alexPupnold.width > theCapShape.topLeftX + 50) && (alexPupnold.y < theCapY + 10 + dogBowl.height / 2) && (alexPupnold.y + alexPupnold.height / 2 > theCapY + 10)) {
        score += 10
    }
}

const drawAlexPupnold = () => {
    ctx.drawImage(alexPupnoldImg, alexPupnold.x, alexPupnold.y, alexPupnold.width, alexPupnold.height)
    if (alexPupnold.y + alexPupnold.height / 2 < theCapY) {
        gameOverWin();
    }
}

const moveAlexPupnold = () => {
    if (isRightArrow) {
        alexPupnold.x += alexPupnoldXIncrement
        alexPupnoldImg.src = 'images/belayedAlexRight.png';
    } else if (isLeftArrow) {
        alexPupnold.x -= alexPupnoldXIncrement
        alexPupnoldImg.src = 'images/belayedAlexLeft.png';
    }
}

const checkRockBoundaries = () => {
    if (alexPupnold.x <= theCapShape.bottomLeftX - 35 || ((alexPupnold.x + alexPupnold.width) >= theCapShape.bottomRightX + 35)) {
        gameOverLoss();
    }
}

const drawObstacle = () => {
    for (let i = 0; i < obstaclesArray.length; i++) {
        ctx.drawImage(obstaclesArray[i].imgElem, obstaclesArray[i].x, obstaclesArray[i].y, obstaclesArray[i].width, obstaclesArray[i].height)
        obstaclesArray[i].y++

        if (obstaclesArray[i].y == 150 && theCapY < -canvas.height / 2) {
            obstaclesArray.push({
                imgElem: graniteRockImg,
                x: theCapShape.topLeftX + Math.floor((theCapShape.topRightX - theCapShape.topLeftX) * Math.random()),
                y: -10,
                width: graniteRockWidth,
                height: graniteRockHeight
            })
        }
    }
}

const drawTreat = () => {
    for (let i = 0; i < dogTreatsArray.length; i++) {
        ctx.drawImage(dogTreatsArray[i].imgElem, dogTreatsArray[i].x, dogTreatsArray[i].y, dogTreatsArray[i].width, dogTreatsArray[i].height)
        dogTreatsArray[i].y++

        if (dogTreatsArray[i].y == 250 && theCapY < -canvas.height / 2) {
            dogTreatsArray.push({
                imgElem: dogTreatImg,
                x: theCapShape.topLeftX + Math.floor((theCapShape.topRightX - theCapShape.topLeftX) * Math.random()),
                y: -10,
                width: dogTreatWidth,
                height: dogTreatHeight
            })
        }
    }
}

const checkObstacleCollision = () => {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if ((alexPupnold.x < obstaclesArray[i].x + obstaclesArray[i].width / 2) && (alexPupnold.x + alexPupnold.width > obstaclesArray[i].x) && (alexPupnold.y < obstaclesArray[i].y + obstaclesArray[i].height / 2) && (alexPupnold.y + alexPupnold.height / 2 > obstaclesArray[i].y)) {
            gameOverLoss();
        }
    }
}

const checkTreatCollision = () => {
    for (let i = 0; i < dogTreatsArray.length; i++) {
        if ((alexPupnold.x < dogTreatsArray[i].x + dogTreatsArray[i].width / 2) && (alexPupnold.x + alexPupnold.width > dogTreatsArray[i].x) && (alexPupnold.y < dogTreatsArray[i].y + dogTreatsArray[i].height / 2) && (alexPupnold.y + alexPupnold.height / 2 > dogTreatsArray[i].y)) {
            score += 1
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
    drawTreat();
    checkObstacleCollision();
    checkTreatCollision();
}