const gameBoard = require('./game_board.js');
const drawSquare = require('./draw_square.js');
const shuffle = require('./shuffle.js');

const Board = function (squareSize, grid, isPlayer2 = false) {
  this.grid = grid;
  this.squareSize = squareSize;
  this.colors = shuffle(["red", "green", "blue", "yellow", "orange"]);
  this.player2 = isPlayer2;
};

Board.prototype.drawGrid = function (grid) {
  this.grid = grid;
  gameBoard(this, drawSquare);
};

Board.prototype.randPos = function () {
  return Math.floor((Math.random() * (this.grid.length - 1)) + 1);
};


module.exports = Board;
