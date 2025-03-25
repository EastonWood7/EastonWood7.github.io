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
    var hitZoneSize = 25;//defines the size of the hitzone and assign it to a variable
    var damageFromObstacle = 10;//defines the amount of damage from the obstacle
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates the obstacle hitzone using the size and damage parameters and assigns it to a variable
    
    sawBladeHitZone.x = 400;//set the x position of the sawblade 
    sawBladeHitZone.y = groundY - 40;//set the y position of the sawblade
    game.addGameItem(sawBladeHitZone);//adds the sawblade hitzone to the game

    var obstacleImage = draw.bitmap("img/sawblade.png");//draws the sawblade and stores it to a variable
    sawBladeHitZone.addChild(obstacleImage);//attaches the image to the sawblade hitzone

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
