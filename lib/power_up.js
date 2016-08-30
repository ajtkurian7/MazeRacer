const shuffle = require('./shuffle.js');

const PowerUp = function (player, board) {
  let powerUps = ["slow"];
  // ["freeze", "rotate", "blind", "reverse", "vanish", "slow", "fast"];
  this.type = shuffle(powerUps)[0];
  this.forPlayer = player;
  this.board = board;
  this.xPos = board.randPos();
  this.yPos = board.randPos();
  this.xCanvas = 50 * this.yPos + 25;
  this.yCanvas = 50 * this.xPos + 75;
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

  ctx.arc(this.xCanvas, this.yCanvas, 15, 0, 2 * Math.PI, false);
  ctx.fillStyle = "gold";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
  ctx.font = "5px Arial";
  ctx.fillText("P", this.xCanvas, this.yCanvas);
  ctx.closePath();

};

PowerUp.prototype.checkForPowerUp = function (player) {
  if (!player.powerUp) {
    let playerPos = [player.x, player.y];
    let powerUpPos = [this.xCanvas, this.yCanvas];

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
};

PowerUp.prototype.rotate = function() {
  // Keeps rotating the board 360 degrees
};

PowerUp.prototype.blind = function() {
  // rolls down window blinds on the opponents board
};

PowerUp.prototype.reverse = function() {
  // reverse the opponents directions
  this.forPlayer.opponent.reverseDirections = true;
  setTimeout(() => {
    this.forPlayer.opponent.reverseDirections = false;
  }, 5000);

};

PowerUp.prototype.vanish = function() {
  // Opponents icon disappears

};

PowerUp.prototype.slow = function () {
  this.forPlayer.opponent.speed = 800;
  setTimeout(() => {
    this.forPlayer.opponent.speed = 150;
  }, 5000);
};



module.exports = PowerUp;
