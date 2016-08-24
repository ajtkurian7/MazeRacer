const judgeMovement = require("./judge_movement.js");
const movementGrid = require("./movement_grid.js");
const animate = require("./animate_move.js");
const drawPlayerIcon = require("./player_icon.js");

const Player = function (x, y, maze) {
  this.x = x;
  this.y = y;
  this.currentGridPos = [(this.y - 75) / 50, (this.x - 25) / 50];
  this.movementGrid = movementGrid(maze);
  this.movesArray =
    [
      "canMoveUp",
      "canMoveDown",
      "canMoveLeft",
      "canMoveRight",
      "canJumpUp",
      "canJumpDown",
      "canJumpLeft",
      "canJumpRight"
    ];
  this.movesArray.forEach( (move) => {
    this[move] = true;
  });
  this.canMoveUp= false;
  this.canMoveLeft = false;
  this.canJumpUp = false;
  this.canJumpLeft = false;
};

Player.prototype.nullPos = function () {
  let pos = this.currentGridPos;
  this.movementGrid[pos[0]][pos[1]] = null;
};


Player.prototype.reset = function(maze) {
  this.x = 25;
  this.y = 75;
  this.movementGrid = movementGrid(maze);
  this.canMoveUp= false;
  this.canMoveLeft = false;
  this.canJumpUp = false;
  this.canJumpLeft = false;

  this.movesArray.forEach( (move) => {
    this[move] = true;
  });
};

Player.prototype.fail = function() {
  if (judgeMovement(this, this.movementGrid).length) {
    return false;
  } else {
    return true;
  }
};

Player.prototype.drawPlayerIcon = function () {
  drawPlayerIcon(this);
};

Player.prototype.animate = function (prop, distance, duration, jump = false) {
  animate.translate(this, prop, distance, duration, jump);
};

Player.prototype.judgeMovement = function () {
  return judgeMovement(this, this.movementGrid);
};

Player.prototype.validateMoves = function () {
  this.allFalse();
  let validMoves = this.judgeMovement();
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
