//global variables - overall
let canvas;
let ctx;
let intervalId;
let elevationScore = 0;
let treatScore = 0;
let finalScore = 0;

//menuMusic
let menuMusic = document.getElementById("menuMusic");
menuMusic.volume = 0.1;

//gameLossMusic
let gameLossMusic = new Audio();
gameLossMusic.src = "sounds/gameLossMusic.mp3";
gameLossMusic.volume = 0.2;

//gameWinMusic
let gameWinMusic = new Audio();
gameWinMusic.src = "sounds/gameWinMusic.mp3";
gameWinMusic.volume = 0.2;

//splash screen
let mainDOM;
let canvasDOM;

let startBtn = document.querySelector("#startButton");
startBtn.addEventListener("click", () => {
    startGameSetup();
});

const startGameSetup = () => {
    mainDOM = document.querySelector("#mainContainer");

    let splashScreenDOM = document.querySelector("#splashScreen");

    mainDOM.removeChild(splashScreenDOM);

    canvasDOM = document.createElement("div");
    canvasDOM.innerHTML = `<canvas width = "700" height = "500"> </canvas>`;

    mainDOM.appendChild(canvasDOM);
    theCapY = -theCapImg.height + 500;
    skyY = -skyBackgroundImg.height + 500;
    fallingMusic.pause();
    fallingMusic.currentTime = 0;
    gameLossMusic.pause();
    gameLossMusic.currentTime = 0;
    climbingMusic.play();

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    intervalId = setInterval(() => {
        requestAnimationFrame(startGame);
    }, 10);
};

const gameOverLoss = () => {
    climbingMusic.pause();
    climbingMusic.currentTime = 0;
    gameLossMusic.play();
    clearInterval(intervalId);

    elevationScore = 0;
    treatScore = 0;
    finalScore = 0;
    theCapY = -theCapImg.height + 500;
    alexPupnold = {
        x: 300,
        y: 405,
        width: 100,
        height: 92,
    };
    obstaclesArray = [{
        imgElem: graniteRockImg,
        x: 250,
        y: 0,
        width: graniteRockWidth,
        height: graniteRockHeight,
    }, ];
    dogTreatsArray = [{
        imgElem: dogTreatImg,
        x: 250,
        y: -50,
        width: dogTreatHeight,
        height: dogTreatWidth,
    }, ];

    mainDOM.removeChild(canvasDOM);

    let gameOverLossDOM = document.createElement("div");
    gameOverLossDOM.setAttribute("id", "splashScreen");
    //gameOverLossDOM.innerHTML = `<img src="images/gameOverText.png" alt="Game Over"> <p>At least all dogs go to heaven...right?</p> <button id="playAgainButton" class="play-again-button">That was just practice, I wanna try again</button>`;
    gameOverLossDOM.innerHTML = `
  <img src="images/sleepingHeeler.png" alt="sleeping Australian Heeler puppy" class="sleeping-heeler">
  <div class="game-over-loss-text">
  <img src="images/dreamCloud.png" alt="careful! you almost woke up">
  <button id="playAgainButton" class="play-again-button">Go back to sleep and try again</button>
  </div>`;

    gameOverLossDOM.classList.add("game-over-loss");

    mainDOM.appendChild(gameOverLossDOM);

    let playAgainBtn = document.querySelector("#playAgainButton");
    playAgainBtn.addEventListener("click", () => {
        startGameSetup();
    });
};

const gameOverWin = () => {
    climbingMusic.pause();
    climbingMusic.currentTime = 0;
    gameWinMusic.play();
    clearInterval(intervalId);

    congratsTextDOM = document.createElement("div");
    congratsTextDOM.innerHTML = `<img src="images/gameOverWin.gif" alt="You did it!">`;
    congratsTextDOM.classList.add("game-over-win");

    mainDOM.appendChild(congratsTextDOM);

    finalScore = Math.round(elevationScore) + Math.round(treatScore);

    ctx.font = "15px Arial";
    ctx.fillText("Final Score: " + Math.round(finalScore), 300, 300);
};


const startGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSky();
    drawTheCap();
    drawAlexPupnold();
    moveAlexPupnold();
    checkRockBoundaries();
    drawObstacle();
    drawTreat();
    checkObstacleCollision();
    checkTreatCollision();
};