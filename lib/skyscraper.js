const Player = require("./player.js");
const requestAnimationFrame = require("./request_animation_frame.js");
const mazes = require("./maze.js");
const Board = require("./board.js");
const PowerUp = require("./power_up.js");
const shuffle = require("./shuffle.js");
// const MazeCreator = require("./maze_creator.js");

let player = new Player(25, 75, mazes[0]);
let board = new Board(50, player.movementGrid);
let powerUp1 = new PowerUp(player, board);

let player2 = new Player(25, 75, mazes[1], true);
let board2 = new Board(50, player2.movementGrid, true);
let powerUp2 = new PowerUp(player2, board2);
player.opponent = player2;
player2.opponent = player;

function drawPlayer() {
  player.drawPlayerIcon();
  player2.drawPlayerIcon();

  let grid = board.grid;

  board.drawGrid(player.movementGrid);
  board2.drawGrid(player2.movementGrid);

  let grid2 = board.grid;

  powerUp1.checkForPowerUp(player, board);
  powerUp2.checkForPowerUp(player2, board2);



  player.keyboardInput();
  player2.keyboardInput();

  requestAnimationFrame(drawPlayer);
}

document.addEventListener("DOMContentLoaded", function() {
  player.keyboardInput();
  player2.keyboardInput();
  powerUp1.setKeyboardInput();
  powerUp2.setKeyboardInput();
  drawPlayer();
});
