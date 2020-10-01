//global variables - overall
let canvas;
let ctx;
let intervalId;
let elevationScore = 0;
let treatScore = 0;
let finalScore = 0;

//difficultMode
let easyMode = false;
let medMode = false;
let hardMode = false;

let easyModeBtn = document.querySelector('#easyModeBtn');
let medModeBtn = document.querySelector('#medModeBtn');
let hardModeBtn = document.querySelector('#hardModeBtn');


easyModeBtn.addEventListener("click", (event) => {
    easyMode = true;
    medMode = false;
    hardMode = false;
});

medModeBtn.addEventListener("click", (event) => {
    easyMode = false;
    medMode = true;
    hardMode = false;
});

hardModeBtn.addEventListener("click", (event) => {
    easyMode = false;
    medMode = false;
    hardMode = true;
});

//menuMusic
// let menuMusic = document.getElementById("menuMusic");
// menuMusic.volume = 0.1;

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

    elevationScore = 0;
    treatScore = 0;
    finalScore = 0;
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

    mainDOM.removeChild(canvasDOM);

    let gameOverLossDOM = document.createElement("div");
    gameOverLossDOM.setAttribute("id", "splashScreen");
    gameOverLossDOM.innerHTML = `
  <img src="images/gameOverImage.png" alt="careful! you almost woke up from your snoozle">
  <button id="playAgainButtonLoss" class="play-again-button-loss">Go back to sleep and try again</button>
  </div>`;

    gameOverLossDOM.classList.add("game-over-loss");

    mainDOM.appendChild(gameOverLossDOM);

    let playAgainLossBtn = document.querySelector("#playAgainButtonLoss");
    playAgainLossBtn.addEventListener("click", () => {
        startGameSetup();
    });
};

const gameOverWin = () => {
    climbingMusic.pause();
    climbingMusic.currentTime = 0;
    gameWinMusic.play();
    clearInterval(intervalId);

    congratsTextDOM = document.createElement("div");
    congratsTextDOM.setAttribute("id", "splashScreen");
    congratsTextDOM.innerHTML = `<img src="images/gameOverWin.gif" alt="You did it!"> <button id="playAgainButtonWin" class="play-again-button-win">Play again</button>`;
    congratsTextDOM.classList.add("game-over-win");

    mainDOM.appendChild(congratsTextDOM);

    finalScore = Math.round(elevationScore) + Math.round(treatScore);

    ctx.font = "15px Arial";
    ctx.fillText("Final Score: " + Math.round(finalScore), 300, 300);

    let playAgainWinBtn = document.querySelector("#playAgainButtonWin");
    playAgainWinBtn.addEventListener("click", () => {
        mainDOM.removeChild(canvasDOM);
        startGameSetup();
    });
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