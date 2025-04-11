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
    function createObstacles(x, y, hitSize, damage, image, scale) {//create more parameters for personlization
      var hitZoneSize = hitSize;//defines the size of the hitzone and assign it to a variable
      var damageFromObstacle = damage;//defines the amount of damage from the obstacle
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates the obstacle hitzone using the size and damage parameters and assigns it to a variable
      
      obstacleHitZone.x = x;//set the x position of the obstacle 
      obstacleHitZone.y = y;//set the y position of the obstacle
      game.addGameItem(obstacleHitZone);//adds the obstacle hitzone to the game
  
      var obstacleImage = draw.bitmap(image);//draws the obstacle and stores it to a variable
      obstacleHitZone.addChild(obstacleImage);//attaches the image to the obstacle hitzone
  
      obstacleImage.x = -25;//positions the obstacle x on the hitzone
      obstacleImage.y = -25;//positions the obstacle y on the hitzone
      obstacleImage.scaleX = scale;
      obstacleImage.scaleY = scale;
    };

    function createEnemy(x, y, spin, image, ifAxe) {
      var enemy = game.createGameItem("enemy", 25);//creates the enemy game item and adds it to the game
      //var redSquare = draw.rect(50, 50, "red");//creates a red square and stores it in the variable red square 
      //redSquare.x = -25;//offsets the image from the hitzone by -25
      //redSquare.y = -25;//offsets the image from the hitzone by -25
      //enemy.addChild(redSquare);//add the red square as a child to the enemy variable

      var enemyImage = draw.bitmap(image);//draws the obstacle and stores it to a variable
      enemy.addChild(enemyImage);//attaches the image to the obstacle hitzone
      if (ifAxe === false) {
        enemyImage.x = -90;//positions the obstacle x on the hitzone
        enemyImage.y = -70;//positions the obstacle y on the hitzone
      } else {
        enemyImage.x = -40;
        enemyImage.y = -30;
      }

      enemy.x = x;//x position of enemy 
      enemy.y = y;//y position of enemy
      game.addGameItem(enemy);//adds enemy to the game
      enemy.velocityX -= 2;//makes enemy move

      if (spin === true) {//confirms if enemy should spin if spin is true
        enemy.rotationalVelocity = -10;//rotates the enemy
      };

      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10)//subtracts 10 from health when it hits hallebot
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100); //increases score by 100 when halle shoots the enemy
        enemy.fadeOut();// makes the enemy fade out when they are shot
        if (ifAxe === false) {
          createReward(enemy.x - 60, groundY - 50, 2, 10, 10, "img/shield.png", true, 0.6);
          game.changeIntegrity(10);
          game.increaseScore(10);
        };
        //enemy.shrink()
        //enemy.flyTo(x,y)
      };
    }
    


    function createReward(x, y, speed, health, points, image, shield, scale) {
      var reward = game.createGameItem("reward", 25);//creates the reward game item and adds it to the game
      //var blueSquare = draw.rect(50, 50, "blue");//creates a blue square and stores it in the variable blue square 
      //blueSquare.x = -25;//offsets the image from the hitzone by -25
      //blueSquare.y = -25;//offsets the image from the hitzone by -25
      //reward.addChild(blueSquare);//add the blue square as a child to the reward variable

      reward.x = x;//x position of reward 
      reward.y = y;//y position of reward
      game.addGameItem(reward);//adds reward to the game
      reward.velocityX -= speed;//makes reward move

      var rewardImage = draw.bitmap(image);//draws the obstacle and stores it to a variable
      reward.addChild(rewardImage);//attaches the image to the obstacle hitzone
      if (shield === false) {
        rewardImage.x = -24;
        rewardImage.y = -20;
        rewardImage.scaleX = scale;
        rewardImage.scaleY = scale;
      } else {
        rewardImage.x = -60;
        rewardImage.y = -50;
        rewardImage.scaleX = scale;
        rewardImage.scaleY = scale;
      }

      reward.onPlayerCollision = function () {
        game.changeIntegrity(health)//adds 10 from health when it hits hallebot
        game.increaseScore(points);//increases score
        reward.fadeOut();// makes the reward fade out when they are hit
      };
    }

    

    function createLevel(x, y, speed, health, image) {
      var level = game.createGameItem("level", 25);//creates the level game item and adds it to the game
      //var yellowSquare = draw.rect(50, 50, "yellow");//creates a yellow square and stores it in the variable yellow square 
      //yellowSquare.x = -25;//offsets the image from the hitzone by -25
      //yellowSquare.y = -25;//offsets the image from the hitzone by -25
      //level.addChild(yellowSquare);//add the yellow square as a child to the level variable

      var levelImage = draw.bitmap(image);//draws the obstacle and stores it to a variable
      level.addChild(levelImage);//attaches the image to the obstacle hitzone
      levelImage.x = -100;
      levelImage.y = -100;
      levelImage.scaleX = 0.8;
      levelImage.scaleY = 0.8;

      level.x = x;//x position of level 
      level.y = y;//y position of level
      game.addGameItem(level);//adds levels to the game
      level.velocityX -= speed;//makes level move

      level.onPlayerCollision = function () {
        game.changeIntegrity(health)//adds 100 from health when it hits hallebot
        game.increaseScore(100);
        level.fadeOut();// makes the level fade out when they are hit
        startLevel();
      };
    }
   
    

    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel];//returns the current level from the level data array and stores it in var level
      var levelObjects = level.gameItems//retrieves the array of game items and stores it in level objects

      for (var i = 0; i < levelObjects.length; i++) {
        var element = levelObjects[i];
        if (element.type === "sawblade") {//checks the type of key value of the game items objects to determine which objects to make
          createObstacles(element.x, element.y, element.hitSize, element.damage, element.image, element.scale);//if the if is true it will call the relevant function
        };

        if (element.type === "spikes") {//checks the type of key value of the game items objects to determine which objects to make
          createObstacles(element.x, element.y, element.hitSize, element.damage, element.image, element.scale);//if the if is true it will call the relevant function
        };

        if (element.type === "enemy") {//checks the type of key value of the game items objects to determine which objects to make
          createEnemy(element.x, element.y, element.spin, element.image, element.ifAxe);//if the if is true it will call the relevant function
        };

        if (element.type === "reward") {//checks the type of key value of the game items objects to determine which objects to make
          createReward(element.x, element.y, element.speed, element.health, element.points, element.image, element.shield, element.scale);//if the if is true it will call the relevant function
        };

        if (element.type === "level") {//checks the type of key value of the game items objects to determine which objects to make
          createLevel(element.x, element.y, element.speed, element.health, element.image);//if the if is true it will call the relevant function
        };
      };

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
