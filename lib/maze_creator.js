const shuffle = require("./shuffle.js");

const MazeCreator = function (width, height, color) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.grid = initGrid();
  function initGrid() {
    let grid = new Array(width);
    for (var i = 0; i < grid.length; i++) {
      grid[i] = new Array(height);
      for (var j = 0; j < grid[i].length; j++) {
        grid[i][j] = 0;
      }
    }
    return grid;
  }
};

MazeCreator.prototype.outputGrid = function () {
  let grid = this.grid;
  let startPos = [Math.floor(Math.random() * this.width), grid.length - 1];
  grid[startPos[0]][startPos[1]] = this.color;
  // start at random position on last column, mark that position with color

  // move position in random direction (up, down, left, jumpUP, jumpDown, jumpLeft)

  let moveDiffs = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [2, 0],
    [-2, 0],
    [0, -2]
  ];


  // loop through assigning color to random direction until at first column
  let moves = shuffle(moveDiffs);

  while (startPos[1] > 0) {
    let moveDiff = moves.shift();
    let newPos = [moveDiff[0] + startPos[0], moveDiff[1] + startPos[1]];
    if (grid[newPos[0]] && grid[newPos[0]][newPos[1]] === 0) {
      grid[newPos[0]][newPos[1]] = this.color;
      startPos = newPos;
      moves = shuffle(moveDiffs);
    }
  }


  return grid;
};

module.exports = MazeCreator;
