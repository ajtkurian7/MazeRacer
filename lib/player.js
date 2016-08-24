const judgeMovement = require("./judge_movement.js");
const movementGrid = require("./movement_grid.js");
const animate = require("./animate_move.js");
const drawPlayerIcon = require("./player_icon.js");

const Player = function (x, y, maze, player2 = false) {
  this.x = x;
  this.y = y;
  this.movementGrid = movementGrid(maze);
  this.player2 = player2;
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

Player.prototype.currentGridPos = function () {
  return [(this.y - 75) / 50, (this.x - 25) / 50];
};

Player.prototype.currentPosVal = function () {
  let pos = this.currentGridPos();
  return this.movementGrid[pos[0]][pos[1]];
};

Player.prototype.nullPos = function () {
  let pos = this.currentGridPos();
  if (this.currentPosVal() >= 0) {
    this.movementGrid[pos[0]][pos[1]] = null;
  }
};

Player.prototype.includes = function (val) {
  let grid = this.movementGrid;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].includes(val)) {return true;}
  }

  return false;
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
  drawPlayerIcon(this, this.player2);
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
