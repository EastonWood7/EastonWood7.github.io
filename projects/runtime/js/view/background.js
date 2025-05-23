

var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var castle;
        var castle2;
        var buildings = [];
        var ending;
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth, groundY, 'gray'); //this draws the rectangle and stores it in a variable called backgroundFill
            background.addChild(backgroundFill);//puts the variable in 42 into the background
            
            // TODO 2: - Add a moon and starfield
            for (var i = 0; i < 100; i++) {
                var circle = draw.circle(2, "white", "LightGray", 2);//creates a circle with a specified radius, border color, fill color, alpha
                circle.x = canvasWidth * Math.random();//set random x within canvas width
                circle.y = groundY * Math.random();// set random y within groundY range
                background.addChild(circle);//adds star to background container
            }

            var moon = draw.bitmap("img/moon.png");//creates a bit map object using the moon and stores it in the moon variable
            moon.x = canvas.width - canvas.width/2;//sets the moons x position
            moon.y = groundY - 400;//sets the moons y position
            moon.scaleX = 0.6;//scales the moons width
            moon.scaleY = 0.6;//scales the moons height
            background.addChild(moon);//adds the moon to the background container
  

            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            //for (var i = 0; i < 5; i++) {
                //var buildingColors = ["red", "blue", "yellow", "orange", "purple"]
                //var buildingHeight = 300 * Math.random(); //assign 300 to height variable
                //var building = draw.rect(75, buildingHeight, buildingColors[i], "Black", 1); //draws a rectangle with 75 as the width buildingheight as the height, light grey as fill color, black as outline color
                //building.x = 200 * i;// multiplys 200 by the current i value and stores it as the building x
                //building.y = groundY - buildingHeight; // takes the ground y and subtracts the building height and stores it as the y value
                //background.addChild(building);// adds the building to the background container
                //buildings.push(building);// add the building to the building array for later
              //}
            
            // TODO 3: Part 1 - Add a tree
            //tree = draw.bitmap("img/tree.png");//draws the tree bitmap and stores it to the variable tree
            //tree.x = canvas.width - 300;//places the tree off to the right
            //tree.y = groundY - 225;//places the tree at the ground
            //background.addChild(tree);//add the tree to the background container

            castle = draw.bitmap("img/castle.png");
            castle.scaleX = 7.5;
            castle.scaleY = 2.8;
            castle.x = 0;
            castle.y = 0;
            background.addChild(castle);

            castle2 = draw.bitmap("img/castle.png");
            castle2.scaleX = 7.5;
            castle2.scaleY = 2.8;
            castle2.x = 1900;
            castle2.y = 0;
            background.addChild(castle2);
            
            

            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            //tree.x -= 2; //moves the tree to the left by subtracting from where its at
            
            //if (tree.x < -200) { 
                //tree.x = canvas.width;
            //}
            // TODO 4: Part 2 - Parallax
            //for (var i = 0; i < buildings.length; i++) {
                //var building = buildings[i];//the individual index of the buildings array stored in the building variable
                //building.x -= 1;//subtracts 1 from the buildings x position
                //if (building.x < -100) {//resets the building to the right if it goes off the left side. 
                    //building.x = canvasWidth;
                //}
            //}

            castle.x -= 1.3;
            castle2.x -= 1.3;

            if (castle.x < -1900) {
                castle.x = canvasWidth;
            };

            if (castle2.x < -1900) {
                castle2.x = canvasWidth;
            };


        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
