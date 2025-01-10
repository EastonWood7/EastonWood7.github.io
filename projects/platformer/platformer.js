$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the drawGrid() function call below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can help you determine specific x any y values throughout the game
     * Comment the function call out to remove the grid
     */

    // drawGrid();

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)
createPlatform(200, 650, 130, 200);
createPlatform(500, 520, 100, 20);
createPlatform(600, 270, 20, 550);
createPlatform(500, 700, 100, 100);
createPlatform(200, 400, 100, 20);
createPlatform(200, 0, 20, 500);
createPlatform(400, 270, 200, 10);
createPlatform(800, 0, 20, 540);
createPlatform(600, 350, 100, 10);
createPlatform(720, 480, 100, 10);
createPlatform(600, 690, 800, 100);
createPlatform(110, 700, 100, 50);
createPlatform(800, 480, 400, 10);
createPlatform(950, 480, 100, 60);
createPlatform(1200, 650, 300, 100);
createPlatform(1270, 550, 100, 100);
createPlatform(800, 420, 100, 60);
createPlatform(1050, 350, 35, 10);
createPlatform(1280, 300, 100, 10);
createPlatform(1340, 0, 100, 1000);
createPlatform(800, 200, 400, 10);
createPlatform(950, 170, 40, 30);
createPlatform(200, 150, 150, 10);
createPlatform(700, 150, 100, 10);

    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)
createCollectable("database", 530, 600, 0.01, 1);
createCollectable("steve", 950, 120, 0.005, 1);
createCollectable("max", 870, 500, 0.01, 1);
createCollectable("grace", 250, 90, 0.01, 1);
createCollectable("kennedi", 730, 90, 0.01, 1);    

    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)
createCannon("right", 700, 3000);
createCannon("bottom", 700, 1500);
createCannon("top", 720, 1500);
createCannon("bottom", 1280, 10);
    
    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
