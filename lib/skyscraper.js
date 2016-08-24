
const Player = require("./player.js");
const requestAnimationFrame = require("./request_animation_frame.js");
const maze = require("./maze.js");
const keyShortcuts = require("./key_shortcuts.js");
const keyShortcuts2 = require("./key_shortcuts2.js");
const Board = require("./board.js");

let player = new Player(25, 75, maze);
let player2 = new Player(25, 75, maze, true);
let board = new Board(50, player.movementGrid);
let board2 = new Board(50, player2.movementGrid, true);


function draw() {
  keyShortcuts(player);
  keyShortcuts2(player2);
  drawPlayer();
}


function drawPlayer() {
  player.drawPlayerIcon();
  player2.drawPlayerIcon();
  board.drawGrid(player.movementGrid);
  board2.drawGrid(player2.movementGrid);

  requestAnimationFrame(drawPlayer);
}



document.addEventListener("DOMContentLoaded", function() {
  draw();
});
