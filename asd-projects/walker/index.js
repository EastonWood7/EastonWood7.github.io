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
    A: 65,
    D: 68,
    W: 87,
    S: 83,
    ENTER: 13
  }
  
  // Game Item Objects
  let walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
    it: true,
    id: "#walker"
  }

  let walker2 = {
    x: $("#board").width() - $("#walker2").width(),
    y: $("#board").height() - $("#walker2").height(),
    speedX: 0,
    speedY: 0,
    it: false,
    id: "#walker2"
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

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {//updates the website 60 times a second
    repositionGameItem(walker);
    repositionGameItem(walker2);
    wallCollision(walker);
    wallCollision(walker2);
    redrawGameItem(walker);
    redrawGameItem(walker2);
    tagged(walker, walker2);

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
    if (event.which === KEY.A) {
      walker2.speedX = -5;
    } else if (event.which === KEY.D) {
      walker2.speedX = 5;
    } else if (event.which === KEY.W) {
      walker2.speedY = -5;
    } else if (event.which === KEY.S) {
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
    } 
    if (event.which === KEY.A) {
      walker2.speedX = 0;
    } else if (event.which === KEY.D) {
      walker2.speedX = 0;
    } else if (event.which === KEY.W) {
      walker2.speedY = 0;
    } else if (event.which === KEY.S) {
      walker2.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem (player) {//changes the first walkers position
    player.x += player.speedX;
    player.y += player.speedY;
  }

  function redrawGameItem (player) {//updates the 2nd walker
    $(player.id).css("left", player.x);
    $(player.id).css("top", player.y);
  }

  function wallCollision (player) {//checks if the first walker collides with the wall
    if (player.x > $("#board").width() - $(player.id).width()) {
      player.x -= player.speedX;
    }
    if (player.x < 0) {
      player.x -= player.speedX;
    } 
    if (player.y > $("#board").height() - $(player.id).height()) {
      player.y -= player.speedY;
    } 
    if (player.y < 0) {
      player.y -= player.speedY;
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

  function tagged (w1, w2) {
    if (tag(w1, w2)) {
      changeColor();
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
