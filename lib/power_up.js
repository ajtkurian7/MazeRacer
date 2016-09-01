const shuffle = require('./shuffle.js');

const PowerUp = function (player, board) {
  let powerUps = ["freeze", "rotate", "reverse", "vanish", "slow", "flip"];
  // ["freeze", "rotate", "reverse", "vanish", "slow"];
  this.type = shuffle(powerUps)[0];
  this.forPlayer = player;
  this.board = board;
  this.grid = board.grid;
  this.xPos = board.randPos();
  this.yPos = board.randPos();
  this.xCanvas = () => { return 50 * this.yPos + 25; };
  this.yCanvas = () => { return 50 * this.xPos + 75; };
  this.Id = player.player2 ? "power-up2" : "power-up1";


};

PowerUp.prototype.setKeyboardInput = function () {
  let letter = this.forPlayer.player2 ? "u" : "q";
  let htmlLabel = document.getElementById(this.Id);
  let that = this;
  key(letter, function() {
    if (htmlLabel.innerHTML) { that[that.type](); }
  });
};

PowerUp.prototype.drawIcon = function() {
  let canvas = document.getElementById(this.forPlayer.canvasId);
  let ctx = canvas.getContext("2d");
  ctx.beginPath();

  ctx.arc(this.xCanvas(), this.yCanvas(), 15, 0, 2 * Math.PI, false);
  ctx.fillStyle = "gold";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
  ctx.font = "5px Arial";
  ctx.fillText("P", this.xCanvas(), this.yCanvas());
  ctx.closePath();

};

PowerUp.prototype.checkForPowerUp = function (player) {
  if (!player.powerUp) {

    // listener when board changes update new location for the power up
    if (this.grid !== this.board.grid) {
      this.grid = this.board.grid;
      this.xPos = this.board.randPos();
      this.yPos = this.board.randPos();
    }

    let playerPos = [player.x, player.y];
    let powerUpPos = [this.xCanvas(), this.yCanvas()];

    if (playerPos.toString() === powerUpPos.toString()) {
      player.powerUp = this.type;
      let htmlLabel = document.getElementById(this.Id);
      htmlLabel.innerHTML = htmlLabel.innerHTML || this.type.toUpperCase();
    } else {
      this.drawIcon();
    }
  }
};

PowerUp.prototype.freeze = function () {
  // Freeze opponent for 5 seconds
  this.displayPowerUp();

  let trueMoves = [];
  this.forPlayer.opponent.movesArray.forEach((move)=> {
    if (this.forPlayer.opponent[move]) {
      trueMoves.push(move);
    }
  });

  this.forPlayer.opponent.allFalse();

  setTimeout(() => {
    trueMoves.forEach((move) => {
      this.forPlayer.opponent[move] = true;
    });

  }, 5000);
  this.clearPowerUp();
};

PowerUp.prototype.reverse = function() {
  // reverse the opponents directions
  this.displayPowerUp();

  this.forPlayer.opponent.reverseDirections = true;
  setTimeout(() => {
    this.forPlayer.opponent.reverseDirections = false;
  }, 5000);
  this.clearPowerUp();

};

PowerUp.prototype.vanish = function() {
  // Opponents icon disappears

  this.forPlayer.opponent.vanish = true;
  this.displayPowerUp();

  setTimeout(() => {
    this.forPlayer.opponent.vanish = false;
  }, 5000);
  this.clearPowerUp();

};

PowerUp.prototype.slow = function () {
  this.forPlayer.opponent.speed = 800;

  this.displayPowerUp();

  setTimeout(() => {
    this.forPlayer.opponent.speed = 150;
  }, 5000);
  this.clearPowerUp();
};

PowerUp.prototype.rotate = function() {
  // Keeps rotating the board 360 degrees
  this.displayPowerUp();

  let isPlayer2 = this.forPlayer.opponent.player2;
  let id = isPlayer2 ? "game2" : "game1";
  let element = document.getElementById(id);

  element.classList.add("spin");
  setTimeout(() => {
    element.classList.remove("spin");
  }, 5000);
  this.clearPowerUp();
};

PowerUp.prototype.flip = function () {
  this.displayPowerUp();

  let isPlayer2 = this.forPlayer.opponent.player2;
  let id = isPlayer2 ? "game2" : "game1";
  let element = document.getElementById(id);

  element.classList.add("spin2");
  setTimeout(() => {
    element.classList.remove("spin2");
  }, 5000);
  this.clearPowerUp();
};


PowerUp.prototype.clearPowerUp = function () {
  document.getElementById(this.Id).innerHTML = "";
};

PowerUp.prototype.displayPowerUp = function () {
  let powerUp = this.forPlayer.powerUp;
  let id = this.forPlayer.opponent.player2 ? powerUp + 2 : powerUp + 1;
  let el = document.getElementById(id);

  el.style.visibility = "visible";
  setTimeout(() => {
    el.style.visibility = "hidden";
  }, 2000);
};



module.exports = PowerUp;
