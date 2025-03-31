var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},
          { type: "sawblade", x: 600, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},
          { type: "sawblade", x: 800, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},

          { type: "spikes", x: 1100, y: groundY, hitSize: 32, damage: 10, image: "img/spikes.png", scale: 0.2},

          { type: "enemy", x: 400, y: groundY - 50, spin: true},
          { type: "enemy", x: 800, y: groundY - 50, spin: false},
          { type: "enemy", x: 1200, y: groundY - 50, spin: false},

          { type: "reward", x: 500, y: groundY - 100, speed: 3, health: 100, points: 10},

          { type: "level", x: 1350, y: groundY - 100, speed: 3, health: 100},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},
          { type: "sawblade", x: 800, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},
          { type: "sawblade", x: 1000, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
