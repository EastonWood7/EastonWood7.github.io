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

    function createEnemy(x, y, spin) {
      var enemy = game.createGameItem("enemy", 25);//creates the enemy game item and adds it to the game
      var redSquare = draw.rect(50, 50, "red");//creates a red square and stores it in the variable red square 
      redSquare.x = -25;//offsets the image from the hitzone by -25
      redSquare.y = -25;//offsets the image from the hitzone by -25
      enemy.addChild(redSquare);//add the red square as a child to the enemy variable

      enemy.x = x;//x position of enemy 
      enemy.y = y;//y position of enemy
      game.addGameItem(enemy);//adds enemy to the game
      enemy.velocityX -= 3;//makes enemy move

      if (spin === true) {//confirms if enemy should spin if spin is true
        enemy.rotationalVelocity = 10;//rotates the enemy
      };

      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10)//subtracts 10 from health when it hits hallebot
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100); //increases score by 100 when halle shoots the enemy
        enemy.fadeOut();// makes the enemy fade out when they are shot
        //enemy.shrink()
        //enemy.flyTo(x,y)
      };
    }
    createEnemy(400, groundY - 50, true);
    createEnemy(700, groundY - 50, false);
    createEnemy(900, groundY - 50, false);


    function createReward(x, y, speed, health) {
      var reward = game.createGameItem("reward", 25);//creates the reward game item and adds it to the game
      var redSquare = draw.rect(50, 50, "blue");//creates a red square and stores it in the variable red square 
      redSquare.x = -25;//offsets the image from the hitzone by -25
      redSquare.y = -25;//offsets the image from the hitzone by -25
      reward.addChild(redSquare);//add the red square as a child to the reward variable

      reward.x = x;//x position of enemy 
      reward.y = y;//y position of enemy
      game.addGameItem(reward);//adds enemy to the game
      reward.velocityX -= speed;//makes enemy move

      reward.onPlayerCollision = function () {
        game.changeIntegrity(health)//subtracts 10 from health when it hits hallebot
        reward.fadeOut();// makes the enemy fade out when they are shot
      };
    }

    createReward(500, groundY - 100, 3, 100);

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
