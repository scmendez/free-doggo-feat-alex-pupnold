# free-doggo-feat-alex-pupnold

## Description

You've seen Free Solo (or your friends won't stop talking about it, either or), now comes Free Doggo!

Guide Alex Pup-nold horizontally as he climbs to the top of The Captain while avoiding obstacles on the mountain in order to reach the treats at the top. The game ends if Alex Pup-nold hits an obstacle or falls off the rock (returning a score calculated based on the elevation achieved), or if the top of the rock is reached.

(This game was made with the utmost admiration for Alex Honnold's feat, it was beyond incredible. This is probably the closest I'll ever get to doing something like that.)

## MVP (DOM - CANVAS)

- Alex Pup-nold (rock climbing dog) that moves horizontally
- falling obstacles (rocks) appearing randomly on the mountain as Alex Pup-nold climbs
- mountain background moving down to give the illusion of Alex Pup-nold climbing
- touching obstacles or going off the rock will end the game
- bowl of treats at the top
- score based on elevation reached

## Backlog

- treats to increase points
- sounds
- difficulty levels
- elevation fun fact popups
- high score log

## Data structure

# main.js

- buildSplashScreen() {}
- buildGameScreen () {}
- buildGameOverLoseScreen () {}
- buildGameOverWinScreen () {}

# game.js

- game () {}
- startLoop () {}
- checkObstacleCollision () {}
- addObstacle () {}
- checkRockBoundaries () {}
- updateRockBackground () {}
- GameOverLoss () {}
- GameOverWin () {}

# alexPupnold.js

- alexPupnold () {this.x; this.y}
- draw () {}
- move () {}
- checkObstacleCollision () {}
- checkRockBoundaries () {}

# rockBackground.js

- draw () {}
- move () {}
- checkRockBoundaries () {}
- score () {}

# obstacles.js

- obstacle () {}
- draw () {}
- move () {}
- checkObstacleCollision () {}

## States y States Transitions

Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameOverLoseScreen
- gameOverWinScreen

## Task

- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverLoseScreen
- main - buildGameOverWinScreen
- game - updateRockBackground
- alexPupnold - draw
- alexPupnold - move
- rockBackground - draw
- rockBackground - move
- obstacles - draw
- obstacles - move
- game - checkRockBoundaries
- game - checkObstacleCollision
- game - addEventListener

## Links

### Trello

[Link url](https://trello.com)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/scmendez/free-doggo-feat-alex-pupnold)
[Link Deploy](https://scmendez.github.io/free-doggo-feat-alex-pupnold/)

### Slides

URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
