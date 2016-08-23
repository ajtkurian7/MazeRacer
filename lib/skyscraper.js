
const Player = require("./player.js");
const animate = require("./animate_move.js");
const requestAnimationFrame = require("./request_animation_frame.js");
const drawSquare = require("./draw_square.js");
const drawPlayerIcon = require("./player_icon.js");
const gameBoard = require("./game_board.js");
const shuffle = require("./shuffle.js");
const maze = require("./maze.js");
const judgeMovement = require("./judge_movement.js");
const movementGrid = require("./movement_grid.js");
const keyShortcuts = require("./key_shortcuts.js");

let player = new Player(25, 75, maze);
const COLORS =["red", "green", "blue", "yellow", "orange"];


function draw() {
  player.canJumpRight = true;
  keyShortcuts(player);
  drawGrid(maze);
  drawPlayer();
}


function drawPlayer() {

  drawPlayerIcon(player);

  requestAnimationFrame(drawPlayer);
}


function drawGrid(array) {
  let gridSize = 50;
  colors = shuffle(COLORS);

  gameBoard(array, drawSquare, colors, gridSize);

}


document.addEventListener("DOMContentLoaded", function() {
  draw();
});
