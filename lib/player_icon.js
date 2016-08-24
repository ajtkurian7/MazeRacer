function playerIcon(player, player2) {
  let canvasId = (player2) ? "player2" : "player";
  let playerCanvas = document.getElementById(canvasId);
  let ctx = playerCanvas.getContext("2d");


  ctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
  ctx.beginPath();

  ctx.arc(player.x, player.y, 15, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'purple';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
  ctx.closePath();

}

module.exports = playerIcon;
