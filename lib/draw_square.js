function drawSquare(options) {
  let canvas = document.getElementById("board");
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = options.color;
  ctx.strokeStyle = "black";
  ctx.lineWidth = "2";
  ctx.fillRect(
    (options.pos[0] + 1) * options.size,
    (options.pos[1] + 1) * options.size,
    options.size,
    options.size
  );
  ctx.strokeRect(
    (options.pos[0] + 1) * options.size,
    (options.pos[1] + 1) * options.size,
    options.size,
    options.size
  );
  ctx.closePath();

}

module.exports = drawSquare;
