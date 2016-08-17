

function draw() {


  drawGrid([
    [1, 1, 1, 1],
    [0, 2, 2, 4],
    [0, 4, 3, 3],
    [3, 4, 4, 3]
  ]);
}




function drawSquare(options) {
  let canvas = document.getElementById("board");
  let ctx = canvas.getContext("2d");

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

}

function drawGrid(array) {
  let size = 50;
  let colors = ["red", "green", "blue", "yellow", "orange"];
  colors = shuffle(colors);

  for (var row = 0; row < array.length; row++) {
    for (var col = 0; col < array[row].length; col++) {
      drawSquare({
        color: colors[array[row][col]],
        size: size,
        pos: [col, row]
      });
    }
  }

}

function shuffle(array){
  let randIndex = (arrLength) => Math.floor(Math.random() * arrLength);
  let returnArr = [];
  while (array.length > 0) {
    let index = randIndex(array.length);
    returnArr.push(array[index]);
    array.splice(index, 1);
  }

  return returnArr;
}

document.addEventListener("DOMContentLoaded", function() {
  draw();
});
