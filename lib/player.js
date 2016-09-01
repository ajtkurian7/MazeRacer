const judgeMovement = require("./judge_movement.js");
const movementGrid = require("./movement_grid.js");
const animate = require("./animate_move.js");
const drawPlayerIcon = require("./player_icon.js");
const keyShortcuts = require("./key_shortcuts.js");
const keyShortcuts2 = require("./key_shortcuts2.js");
const revKeyShortcuts = require("./rev_key_shortcuts.js");
const revKeyShortcuts2 = require("./rev_key_shortcuts2.js");


const Player = function (x, y, mazes, player2 = false) {
  this.canvasId = (player2) ? "player2" : "player";

  this.x = x;
  this.y = y;
  this.maze = mazes.shift();
  this.movementGrid = movementGrid(this.maze);
  this.mazeArray = mazes;
  this.player2 = player2;
  this.level = 1;
  this.opponent = null;
  this.powerUp = null;
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

  // power up modifiers
  this.reverseDirections = false;
  this.speed = 150;
  this.vanish = false;
};

Player.prototype.keyboardInput = function () {
  if (!this.reverseDirections) {
    if (this.player2) {
      return keyShortcuts2(this);
    } else {
      return keyShortcuts(this);
    }
  } else {
    if (this.player2) {
      return revKeyShortcuts2(this);
    } else {
      return revKeyShortcuts(this);
    }
  }
};

Player.prototype.unbindAll = function() {
  let keys = ['a', 's', 'd', 'w', 'shift+d', 'shift+a', 'shift+s', 'shift+w'];
  let keys2 = ['i', 'j', 'k', 'l', 'space+i', 'space+j', 'space+k', 'space+l'];
  if (this.player2) {
    keys2.forEach((k) => {
      key.unbind(k);
    });
  } else {
    keys.forEach((k) => {
      key.unbind(k);
    });
  }

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


Player.prototype.reset = function() {
  this.x = 25;
  this.y = 75;
  this.movementGrid = movementGrid(this.maze);


  this.movesArray.forEach( (move) => {
    this[move] = true;
  });

  this.canMoveUp= false;
  this.canMoveLeft = false;
  this.canJumpUp = false;
  this.canJumpLeft = false;
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
  this.displayLevel();
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

Player.prototype.checkWin = function (prevPosVal) {
  if (this.currentPosVal() === -2) {
    if (this.includes(prevPosVal)) {
      setTimeout(() => { this.reset(this.maze); }, 200);
    } else {
      if (this.mazeArray.length) {
        this.level += 1;
        setTimeout(() => {
          this.maze = this.mazeArray.shift().slice();
          this.reset();
          this.resetPowerUp();
        }, 200);
      } else {
        alert(this.player2 ? "Player 2 Wins" : "Player 1 Wins");
        document.location.reload(true);
      }
    }
  }
};

Player.prototype.resetPowerUp = function () {
  let id = this.player2 ? 'power-up2' : 'power-up1';
  let el = document.getElementById(id);
  if (el.innerHTML === "") { this.powerUp = null; }

};

Player.prototype.displayLevel = function () {
  let id = this.player2 ? "level2" : "level1";
  let el = document.getElementById(id);

  if (this.level === 6) {
    el.innerHTML = "Boss Level";
  } else {
    el.innerHTML = this.level;
  }
};


module.exports = Player;
