/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    ENTER: 13
  };

  
  // Game Item Objects

  function gameObj (x, y, width, height, borderRadius, speedX, speedY, id) {
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

  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  var ball = gameObj(200, 200, 10, 10, 5, 1, 1, "#ball");
  $("#ball").css(ball);

  var leftPaddle = gameObj(0, 0, 10, 80, 10, 0, 0, "#leftPaddle");
  leftPaddle.leftScore = 0;
  $("#leftPaddle").css(leftPaddle);

  var rightPaddle = gameObj(BOARD_WIDTH - 10, 0, 10, 80, 10, 0, 0, "#rightPaddle");
  rightPaddle.rightScore = 0;
  $("#rightPaddle").css(rightPaddle);

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp); 

  startBall();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveStuff(ball);
    moveStuff(leftPaddle);
    moveStuff(rightPaddle);
    wallCollision(ball);
    wallCollision(leftPaddle);
    wallCollision(rightPaddle);
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      rightPaddle.speedY = -4;
    } else if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 4;
    }
    if (event.which === KEY.W) {
      leftPaddle.speedY = -4;
    } else if (event.which === KEY.S) {
      leftPaddle.speedY = 4;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.UP) {
      rightPaddle.speedY = 0;
    } else if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 0;
    }
    if (event.which === KEY.W) {
      leftPaddle.speedY = 0;
    } else if (event.which === KEY.S) {
      leftPaddle.speedY = 0;
    }
  }

  function startBall () {
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveStuff(obj) {
    obj.x += obj.speedX;
    $(obj.id).css("left", obj.x);
    obj.y += obj.speedY;
    $(obj.id).css("top", obj.y);
  }

  function wallCollision (obj) {//controls collisions and points being scored
    if (obj.id === "#ball") {
      if (obj.x + obj.width > BOARD_WIDTH || obj.x < 0) {
        if (obj.x < 0) {
          leftPaddle.leftScore += 1;
          $("#player1Score").html("left:" + leftPaddle.leftScore);
        }
        if (obj.x + obj.width > BOARD_WIDTH) {
          rightPaddle.rightScore += 1;
          $("#player2Score").html("right:" + rightPaddle.rightScore);
        }
        startBall();
        obj.x = BOARD_WIDTH / 2;
        obj.y = BOARD_HEIGHT / 2;
      }
      if (obj.y + obj.height > BOARD_HEIGHT || obj.y < 0) {
        obj.speedY = -obj.speedY
      }
    } else {
      if (obj.x + obj.width > BOARD_WIDTH || obj.x < 0) {
        obj.x -= obj.speedX
      }
      if (obj.y + obj.height > BOARD_HEIGHT || obj.y < 0) {
        obj.y -= obj.speedY
      }
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
