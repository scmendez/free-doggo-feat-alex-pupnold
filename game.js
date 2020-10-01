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


    theCapShape = {
        bottomLeftX: 100,
        topLeftX: 150,
        topRightX: 550,
        bottomRightX: 600,
    };
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

const backToMenu = () => {
    mainDOM.removeChild(canvasDOM);
    mainDOM.removeChild(congratsTextDOM);
    reSplashScreenDOM = document.createElement("div");
    reSplashScreenDOM.setAttribute("id", "splashScreen");
    reSplashScreenDOM.innerHTML = `<div class="game-logo">
        <img src="images/gameLogo.png" alt="free doggo logo" />
        <!-- <audio autoplay loop>
          <source src="sounds/menuMusic.mp3" id="menuMusic">
        </audio> -->
      </div>
      <div class="start-game-info">
        <section class="start-game-info-goal">
          <img src="images/goalTitle.png" alt="Goal:" />
          <br />
          Help Alex Pup-nold achieve his dream of reaching the top of The Cap without falling off the sides or colliding
          with falling rocks. Catch the falling dog treats and reach the dog
          bowl at the top for bonus points!
        </section>
        <section class="start-game-info-controls">
          <img src="images/controlsTitle.png" alt="Controls:" />
          <ul>
            <li>Left Arrow Key - move left</li>
            <li>Right Arrow Key - move right</li>
          </ul>
        </section>
        <section class="start-game-info-buttons">
          <img src="images/difficultyTitle.png" alt="Difficulty:" />
          <section class="start-game-info-difficulty-levels">
            <button id="easyModeBtn">Easy</button>
            <button id="medModeBtn">Medium</button>
            <button id="hardModeBtn">Hard</button>
          </section>
          <button id="startAgainButton" class="start-button">Start Game</button>
        </section>
      </div>`;

    reSplashScreenDOM.classList.add('splash-screen')
    mainDOM.appendChild(reSplashScreenDOM);

    startAgainBtn = document.querySelector("#startAgainButton");
    startAgainBtn.addEventListener("click", () => {
        startGameSetup();
    });
}

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
    congratsTextDOM.innerHTML = `<img src="images/gameOverWin.gif" alt="You did it!"> <button id="mainMenuWinBtn" class="main-menu-win-button">Main menu</button>`;
    congratsTextDOM.classList.add("game-over-win");

    mainDOM.appendChild(congratsTextDOM);

    finalScore = Math.round(elevationScore) + Math.round(treatScore);

    ctx.font = "15px Arial";
    ctx.fillText("Final Score: " + Math.round(finalScore), 300, 300);

    let mainMenuWinBtn = document.querySelector("#mainMenuWinBtn");
    mainMenuWinBtn.addEventListener("click", () => {
        backToMenu();
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