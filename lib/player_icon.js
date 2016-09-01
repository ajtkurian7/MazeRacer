function playerIcon(player, player2) {
  let canvasId = (player2) ? "player2" : "player";
  let playerCanvas = document.getElementById(canvasId);
  let ctx = playerCanvas.getContext("2d");

  playerCanvas.width = (player.movementGrid.length + 2) * 50;
  playerCanvas.height = playerCanvas.width;


  ctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
  if (!player.vanish) {
    ctx.beginPath();

    ctx.arc(player.x, player.y, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = player2 ? 'lightblue' : 'purple';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    ctx.closePath();
  }

}

module.exports = playerIcon;
