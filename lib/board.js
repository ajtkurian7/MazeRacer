const gameBoard = require('./game_board.js');
const drawSquare = require('./draw_square.js');
const shuffle = require('./shuffle.js');

const Board = function (squareSize, grid, player2 = false) {
  this.grid = grid;
  this.squareSize = squareSize;
  this.colors = shuffle(["red", "green", "blue", "yellow", "orange"]);
  this.player2 = player2;
};

Board.prototype.drawGrid = function (grid) {
  this.grid = grid;
  gameBoard(this.grid, drawSquare, this.colors, this.squareSize, this.player2);
};


module.exports = Board;
