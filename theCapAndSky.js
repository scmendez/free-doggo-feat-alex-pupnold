//global variables - drawSky
let skyBackgroundImg = new Image();
skyBackgroundImg.src = "images/sky2.png";
let skyY;

//global variables - drawTheCap
let theCapImg = new Image();
theCapImg.src = "images/elCap4.png";
let theCapShape = {
    bottomLeftX: 100,
    topLeftX: 150,
    topRightX: 550,
    bottomRightX: 600,
};
let theCapY;

let dogBowlImg = new Image();
dogBowlImg.src = "images/dogBowl.png";
let dogBowl = {
    width: 50,
    height: 40,
};

//climbingMusic
let climbingMusic = new Audio();
climbingMusic.src = "sounds/aClimbersAnthem.mp3";
climbingMusic.volume = 0.2;

//fallingMusic
let fallingMusic = new Audio();
fallingMusic.src = "sounds/rockBorderSound.mp3";
fallingMusic.volume = 0.1;

const drawSky = () => {
    ctx.drawImage(
        skyBackgroundImg,
        0,
        skyY,
        canvas.width,
        skyBackgroundImg.height
    );

    skyY += 0.5;

    ctx.font = "15px Arial";
    ctx.fillText("Elevation: " + Math.round(elevationScore) + "m", 20, 30);
    ctx.font = "15px Arial";
    ctx.fillText("Treat Bonus: " + Math.round(treatScore), 20, 60);
};

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
    ctx.drawImage(theCapImg, 0, theCapY);
    ctx.restore();

    theCapShape.bottomLeftX += 0.01;
    theCapShape.topLeftX += 0.01;
    theCapShape.topRightX -= 0.01;
    theCapShape.bottomRightX -= 0.01;
    // TODO: CHANGED
    theCapY += 5.5;
    elevationScore += 0.492;

    if (theCapShape.topLeftX == 325 && theCapShape.topRightX == 375) {
        ctx.closePath();
    }

    ctx.drawImage(
        dogBowlImg,
        theCapShape.topLeftX + 50,
        theCapY + 10,
        dogBowl.width,
        dogBowl.height
    );
    if (
        alexPupnold.x < theCapShape.topLeftX + 50 + dogBowl.width / 2 &&
        alexPupnold.x + alexPupnold.width > theCapShape.topLeftX + 50 &&
        alexPupnold.y < theCapY + 10 + dogBowl.height / 2 &&
        alexPupnold.y + alexPupnold.height / 2 > theCapY + 10
    ) {
        treatScore += 1.5;
    }
};

const checkRockBoundaries = () => {
    if (
        alexPupnold.x <= theCapShape.bottomLeftX - 35 ||
        alexPupnold.x + alexPupnold.width >= theCapShape.bottomRightX + 35
    ) {
        fallingMusic.play();
        gameOverLoss();
    }
};