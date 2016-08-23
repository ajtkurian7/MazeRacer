const judgeMovement = require("./judge_movement.js");
const movementGrid = require("./movement_grid.js");
const animate = require("./animate_move.js");

const Player = function (x, y, maze) {
  this.x = x;
  this.y = y;
  this.movementGrid = movementGrid(maze);
  this.canMoveUp= true;
  this.canMoveDown = true;
  this.canMoveLeft = true;
  this.canMoveRight = true;
  this.trueMovesArray = [];
  this.movesArray =
    [
      "canMoveUp",
      "canMoveDown",
      "canMoveLeft",
      "canMoveRight"
    ];
};

Player.prototype.animate = function (prop, distance, duration, jump = false) {
  animate.translate(this, prop, distance, duration, jump);
};

Player.prototype.validateMoves = function () {
  this.allFalse();
  let validMoves = judgeMovement(this, this.movementGrid);
  validMoves.forEach( (validMove) => {
    this[validMove] = true;
  });
};

Player.prototype.allFalse = function () {
  this.movesArray.forEach( (moveDirection) => {
    this[moveDirection] = false;
  });
};


module.exports = Player;
