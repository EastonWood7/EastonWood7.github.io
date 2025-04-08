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
          { type: "sawblade", x: 800, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},
          { type: "sawblade", x: 1400, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},
          { type: "sawblade", x: 1800, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},
          { type: "sawblade", x: 2000, y: groundY, hitSize: 25, damage: 10, image: "img/torch.png", scale: 0.4},
          { type: "spikes", x: 1600, y: groundY, hitSize: 32, damage: 10, image: "img/spikes.png", scale: 0.2},

          { type: "enemy", x: 600, y: groundY - 110, spin: true, image: "img/axe.png", ifAxe: true},
          { type: "enemy", x: 2200, y: groundY - 110, spin: true, image: "img/axe.png", ifAxe: true},
          { type: "enemy", x: 900, y: groundY - 50, spin: false, image: "img/knight.png", ifAxe: false},
          { type: "enemy", x: 1200, y: groundY - 50, spin: false, image: "img/knight.png", ifAxe: false},

          { type: "reward", x: 1300, y: groundY - 100, speed: 2, health: 100, points: 10, image: "img/crown.png", shield: false, scale: 0.4},

          { type: "level", x: 3000, y: groundY - 65, speed: 2, health: 100, image: "img/throne.png"},
          
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
