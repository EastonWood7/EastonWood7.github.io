/* global $, sessionStorage */
$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    ENTER: 13
  }

  const KEY2 = {
    LEFT: 65,
    RIGHT: 68,
    UP: 87,
    DOWN: 83,
    ENTER: 13
  }
  
  // Game Item Objects
  let walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
    it: true
  }

  let walker2 = {
    x: $("#board").width() - $("#walker2").width(),
    y: $("#board").height() - $("#walker2").height(),
    speedX: 0,
    speedY: 0,
    it: false
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp); 
  
  $(document).on('keydown', handleKeyDown2);
  $(document).on('keyup', handleKeyUp2);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {//updates the website 60 times a second
    repositionGameItem();
    repositionGameItem2();
    wallCollision();
    wallCollision2();
    redrawGameItem();
    redrawGameItem2();
  
    if (tag (walker, walker2)) {
      changeColor();
    } 

  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event) {//registars the the keys to move the 1st walker being pressed
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    } else if (event.which === KEY.UP) {
      walker.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    } 
  }

  function handleKeyDown2(event) {//registars the the keys to move the 2nd walker being pressed
    if (event.which === KEY2.LEFT) {
      walker2.speedX = -5;
    } else if (event.which === KEY2.RIGHT) {
      walker2.speedX = 5;
    } else if (event.which === KEY2.UP) {
      walker2.speedY = -5;
    } else if (event.which === KEY2.DOWN) {
      walker2.speedY = 5;
    }
  }

  function handleKeyUp(event) {//registars the key being unpressed to move the first walker
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 0;
    } else if (event.which === KEY.UP) {
      walker.speedY = 0;
    } else if (event.which === KEY.DOWN) {
      walker.speedY = 0;
    } else if (event.which === KEY.ENTER) {
      
    }
  }

  function handleKeyUp2(event) {//registars the key being unpressed to move the 2nd walker
    if (event.which === KEY2.LEFT) {
      walker2.speedX = 0;
    } else if (event.which === KEY2.RIGHT) {
      walker2.speedX = 0;
    } else if (event.which === KEY2.UP) {
      walker2.speedY = 0;
    } else if (event.which === KEY2.DOWN) {
      walker2.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem () {//changes the first walkers position
    walker.x += walker.speedX;
    walker.y += walker.speedY;
  }

  function repositionGameItem2 () {// changes the 2nd walkers psoition
    walker2.x += walker2.speedX;
    walker2.y += walker2.speedY;
  }

  function redrawGameItem () {//updates the first walker
    $("#walker").css("left", walker.x);
    $("#walker").css("top", walker.y);
  }

  function redrawGameItem2 () {//updates the 2nd walker
    $("#walker2").css("left", walker2.x);
    $("#walker2").css("top", walker2.y);
  }

  function wallCollision () {//checks if the first walker collides with the wall
    if (walker.x > $("#board").width() - $("#walker").width()) {
      walker.x -= walker.speedX;
    }
    if (walker.x < 0) {
      walker.x -= walker.speedX;
    }
    if (walker.y > $("#board").height() - $("#walker").height()) {
      walker.y -= walker.speedY;
    }
    if (walker.y < 0) {
      walker.y -= walker.speedY;
    }
  }

  function wallCollision2 () {//checks if the 2nd walker collides with the wall
    if (walker2.x > $("#board").width() - $("#walker2").width()) {
      walker2.x -= walker2.speedX;
    }
    if (walker2.x < 0) {
      walker2.x -= walker2.speedX;
    }
    if (walker2.y > $("#board").height() - $("#walker2").height()) {
      walker2.y -= walker2.speedY;
    }
    if (walker2.y < 0) {
      walker2.y -= walker2.speedY;
    }
  }

  function tag (a, b) {//checks if the 2 walkers collide
    return (
      a.x <= b.x + $("#walker").width() &&
      a.x + $("#walker").width() >= b.x &&
      a.y <= b.y + $("#walker").height() &&
      a.y + $("#walker").height() >= b.y
    )
    
  }

  function changeColor () {//changes the color if they collide
    if (walker.it === true) {
      $("#walker").css("backgroundColor", "red");
      $("#walker2").css("backgroundColor", "green");
      walker.it = false
    } else {
      $("#walker2").css("backgroundColor", "red");
      $("#walker").css("backgroundColor", "teal");
      walker.it = true 
    }
    console.log("You're it");
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
