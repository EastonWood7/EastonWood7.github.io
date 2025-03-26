var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createObstacles(x, y, hitSize, damage) {//create more parameters for personlization
      var hitZoneSize = hitSize;//defines the size of the hitzone and assign it to a variable
      var damageFromObstacle = damage;//defines the amount of damage from the obstacle
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates the obstacle hitzone using the size and damage parameters and assigns it to a variable
      
      obstacleHitZone.x = x;//set the x position of the obstacle 
      obstacleHitZone.y = y;//set the y position of the obstacle
      game.addGameItem(obstacleHitZone);//adds the obstacle hitzone to the game
  
      var obstacleImage = draw.bitmap("img/sawblade.png");//draws the obstacle and stores it to a variable
      obstacleHitZone.addChild(obstacleImage);//attaches the image to the obstacle hitzone
  
      obstacleImage.x = -25;//positions the obstacle x on the hitzone
      obstacleImage.y = -25;//positions the obstacle y on the hitzone
    }
    createObstacles(400, groundY - 50, 25, 10);
    createObstacles(800, groundY - 50, 25, 10);
    createObstacles(1000, groundY - 50, 25, 10);

    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
