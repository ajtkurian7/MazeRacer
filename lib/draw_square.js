function drawSquare(options) {
  let boardId = (!options.player2) ? "board" : "board2";
  let canvas = document.getElementById(boardId);
  let ctx = canvas.getContext("2d");
  // ctx.clearRect(0, 0, 600, 600);
  ctx.beginPath();
  ctx.fillStyle = options.color;
  ctx.strokeStyle = "black";
  ctx.lineWidth = "2";
  ctx.fillRect(
    (options.pos[0] ) * options.size,
    (options.pos[1] + 1) * options.size,
    options.size,
    options.size
  );
  ctx.strokeRect(
    (options.pos[0] ) * options.size,
    (options.pos[1] + 1) * options.size,
    options.size,
    options.size
  );
  ctx.closePath();

}

module.exports = drawSquare;
