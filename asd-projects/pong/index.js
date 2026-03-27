/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {//defines what keys are in their number values 
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    ENTER: 13
  };

  
  // Game Item Objects

  function gameObj (x, y, width, height, borderRadius, speedX, speedY, id) {//creates game objects
    var gameObj = {};
    gameObj.x = x;
    gameObj.y = y;
    gameObj.width = width;
    gameObj.height = height;
    gameObj.borderRadius = borderRadius;
    gameObj.speedX = speedX;
    gameObj.speedY = speedY;
    gameObj.id = id;
    return gameObj;
  }

  const BOARD_WIDTH = $("#board").width();//defines the board width
  const BOARD_HEIGHT = $("#board").height();//defines the board height

  var ball = gameObj(200, 200, 10, 10, 5, 1, 1, "#ball");//defines the ball variable 
  $("#ball").css(ball);

  var leftPaddle = gameObj(0, 0, 10, 80, 10, 0, 0, "#leftPaddle");//defines the left paddle variables
  leftPaddle.leftScore = 0;
  $("#leftPaddle").css(leftPaddle);

  var rightPaddle = gameObj(BOARD_WIDTH - 10, 0, 10, 80, 10, 0, 0, "#rightPaddle");//defines the right paddle variables
  rightPaddle.rightScore = 0;
  $("#rightPaddle").css(rightPaddle);

  var botOn = false;//bots logic variables
  var difficulty = prompt("bot difficulty: 1-3 (1 is hardest)")

  var neededWins = 5;

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp); 

  startBall();//starts the ball at the very start of the game

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {//calls the functions 60 times a second
    moveStuff(ball);
    moveStuff(leftPaddle);
    moveStuff(rightPaddle);
    wallCollision(ball);
    wallCollision(leftPaddle);
    wallCollision(rightPaddle);
    hitBall();
    changeBackBorderColor();
    winGame();
    bot();
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleKeyDown(event) {//handles keys being pressed down
    if (event.which === KEY.UP) {//registars up key
      rightPaddle.speedY = -4;
    } else if (event.which === KEY.DOWN) {//registars down key
      rightPaddle.speedY = 4;
    }
    if (event.which === KEY.W) {//registars w key
      leftPaddle.speedY = -4;
    } else if (event.which === KEY.S) {//registars s key
      leftPaddle.speedY = 4;
    }
  }

  function handleKeyUp(event) {//registars keys being unpressed
    if (event.which === KEY.UP) {//registars up key
      rightPaddle.speedY = 0;
    } else if (event.which === KEY.DOWN) {//registars down key
      rightPaddle.speedY = 0;
    }
    if (event.which === KEY.W) {//registars w key
      leftPaddle.speedY = 0;
    } else if (event.which === KEY.S) {//registars s key
      leftPaddle.speedY = 0;
    }
  }

  $("#botButton").on("click", toggleBot);//registers the button click and starts the toggle button function

  function toggleBot () {//toggles on and off the bot based on the button
     if (botOn === false) {//truns on the bot
      botOn = true;
     } else if (botOn === true) {//turns off the bot
      botOn = false;
     }
   }

  function bot () {//creates the bot tracking for the ball
    if (botOn === true) {//checks if the bot is on
      if (ball.y !== leftPaddle.y) {//checks if the paddle and ball are in line with each other
        if (ball.x <= BOARD_WIDTH / 2) {
          leftPaddle.y += ((ball.y - leftPaddle.y) / 4) - (leftPaddle.height / (difficulty + 1));//determines position 
          if (leftPaddle.y < 0) {//makes sure it doesn't go off of the top of the board
            leftPaddle.y = 0;
          } else if (leftPaddle.y >= BOARD_HEIGHT - leftPaddle.height) {//makes sure it doesn't go off the bottom of the board
            leftPaddle.y = BOARD_HEIGHT - leftPaddle.height;
          }
        } else {//returns the bot to the middle when the ball isn't on its side
          returnBot();
        }
      }
    }
  }

  function returnBot () {//returns the bot after the ball crosses sides
    if (leftPaddle.y !== (BOARD_HEIGHT / 2) - (leftPaddle.height / 2)) {
      leftPaddle.y = (BOARD_HEIGHT / 2) - (leftPaddle.height / 2)
    }
  }

  function startBall () {//gives the ball a random speed
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveStuff(obj) {//moves things
    obj.x += obj.speedX;
    $(obj.id).css("left", obj.x);
    obj.y += obj.speedY;
    $(obj.id).css("top", obj.y);
  }

  function hitBall() {//controls paddle and ball collision and also speeds up the ball
    if (ball.x <= leftPaddle.x + leftPaddle.width && ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + leftPaddle.height) {//checks if the left paddle hits the ball and redirects it
      ball.speedX = -ball.speedX;
      ball.speedX *= 1.1;
      ball.speedY *= 1.1;
    }
    if (ball.x >= rightPaddle.x - rightPaddle.width && ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + rightPaddle.height) {//checks if the right paddle hits the ball and redirects it
      ball.speedX = -ball.speedX;
      ball.speedX *= 1.1;
      ball.speedY *= 1.1;
    }
  }

  function wallCollision (obj) {//controls collisions and points being scored
    if (obj.id === "#ball") {//checks for just the ablls position
      if (obj.x + obj.width > BOARD_WIDTH || obj.x < 0) {//checks to see if the ball is in the goal
        if (obj.x < 0) {//checks left goal
          leftPaddle.leftScore += 1;
          $("#player1Score").html("right:" + leftPaddle.leftScore);
          $("#board").css("border-color", "yellow");
          $("#boardLine").css("background-color", "yellow");
        }
        if (obj.x + obj.width > BOARD_WIDTH) {//checks right goal
          rightPaddle.rightScore += 1;
          $("#player2Score").html("left:" + rightPaddle.rightScore);
          $("#board").css("border-color", "yellow");
          $("#boardLine").css("background-color", "yellow");
        }
        startBall();//restarts the ball after scoring
        obj.x = BOARD_WIDTH / 2;//gives the restarted ball x
        obj.y = BOARD_HEIGHT / 2;//gives the restarted ball y
      }
      if (obj.y + obj.height > BOARD_HEIGHT || obj.y < 0) {//redirects the ball y when hitting a wall
        obj.speedY = -obj.speedY
      }
    } else {
      if (obj.x + obj.width > BOARD_WIDTH || obj.x < 0) {//keeps the paddle x in the board
        obj.x -= obj.speedX
      }
      if (obj.y + obj.height > BOARD_HEIGHT || obj.y < 0) {//keeps the paddle y in the board
        obj.y -= obj.speedY
      }
    }
  }

  function changeBackBorderColor () {//changes the border color back after changing it yellow for someone scoring
    if (ball.x > BOARD_WIDTH * .6 || ball.x < BOARD_WIDTH * .4) {//determines if the ball is far enough from the center to change the color back
      $("#board").css("border-color", "white");
      $("#boardLine").css("background-color", "white");
    }
  }

  function winGame () {//ends game when someone gets 5 points
    if (leftPaddle.leftScore === neededWins) {//determines right win
      $("#winner").html("right wins!!!");
      endGame();
    } else if (rightPaddle.rightScore === neededWins) {//determines left win
      $("#winner").html("left wins!!!");
      endGame();
    }
  }
  
  function endGame() {//ends the game
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
