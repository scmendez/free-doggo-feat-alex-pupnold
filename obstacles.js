//global variables - drawObstacle
let graniteRockImg = new Image();
graniteRockImg.src = "images/graniteRock.png";
let graniteRockHeight = 20;
let graniteRockWidth = 20;
let obstaclesArray = [{
    imgElem: graniteRockImg,
    x: 250,
    y: 0,
    width: graniteRockWidth,
    height: graniteRockHeight,
}, ];

//global variables - drawTreat
let dogTreatImg = new Image();
dogTreatImg.src = "images/dogTreat.png";
let dogTreatHeight = 20;
let dogTreatWidth = 30;
let dogTreatsArray = [{
    imgElem: dogTreatImg,
    x: 200,
    y: -50,
    width: dogTreatWidth,
    height: dogTreatHeight,
}, ];

//treatMusic
let treatMusic = new Audio();
treatMusic.src = "sounds/treatBark.mp3";
treatMusic.volume = 0.2;

//collisionMusic
let collisionMusic = new Audio();
collisionMusic.src = "sounds/rockCollisionSound.mp3";
collisionMusic.volume = 0.3;

const drawObstacle = () => {
    for (let i = 0; i < obstaclesArray.length; i++) {
        ctx.drawImage(
            obstaclesArray[i].imgElem,
            obstaclesArray[i].x,
            obstaclesArray[i].y,
            obstaclesArray[i].width,
            obstaclesArray[i].height
        );

        if (easyMode == true) {
            obstaclesArray[i].y += 1.5;
        } else if (medMode == true) {
            obstaclesArray[i].y += 2;
        } else if (hardMode == true) {
            obstaclesArray[i].y += 3;
        }

        if (obstaclesArray[i].y == 150 && theCapY < -75) {
            obstaclesArray.push({
                imgElem: graniteRockImg,
                x: theCapShape.topLeftX +
                    Math.floor(
                        (theCapShape.topRightX - theCapShape.topLeftX) * Math.random()
                    ),
                y: -12,
                width: graniteRockWidth,
                height: graniteRockHeight,
            });
        }
    }
};

const checkObstacleCollision = () => {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (
            alexPupnold.x < obstaclesArray[i].x + obstaclesArray[i].width / 2 &&
            alexPupnold.x + alexPupnold.width > obstaclesArray[i].x &&
            alexPupnold.y < obstaclesArray[i].y + obstaclesArray[i].height / 2 &&
            alexPupnold.y + alexPupnold.height / 2 > obstaclesArray[i].y
        ) {
            collisionMusic.play();
            gameOverLoss();
        }
    }
};

const drawTreat = () => {
    for (let i = 0; i < dogTreatsArray.length; i++) {
        ctx.drawImage(
            dogTreatsArray[i].imgElem,
            dogTreatsArray[i].x,
            dogTreatsArray[i].y,
            dogTreatsArray[i].width,
            dogTreatsArray[i].height
        );

        if (easyMode == true) {
            dogTreatsArray[i].y += 1;
        } else if (medMode == true) {
            dogTreatsArray[i].y += 1.25;
        } else if (hardMode == true) {
            dogTreatsArray[i].y += 2;
        }

        if (dogTreatsArray[i].y == 250 && theCapY < -75) {
            dogTreatsArray.push({
                imgElem: dogTreatImg,
                x: theCapShape.topLeftX +
                    Math.floor(
                        (theCapShape.topRightX - theCapShape.topLeftX) * Math.random()
                    ),
                y: -10,
                width: dogTreatWidth,
                height: dogTreatHeight,
            });
        }
    }
};

const checkTreatCollision = () => {
    for (let i = 0; i < dogTreatsArray.length; i++) {
        if (
            alexPupnold.x < dogTreatsArray[i].x + dogTreatsArray[i].width / 2 &&
            alexPupnold.x + alexPupnold.width > dogTreatsArray[i].x &&
            alexPupnold.y < dogTreatsArray[i].y + dogTreatsArray[i].height / 2 &&
            alexPupnold.y + alexPupnold.height / 2 > dogTreatsArray[i].y
        ) {
            treatScore += 100;
            treatMusic.play();
            dogTreatsArray.splice([i], 1);
        }
    }
};