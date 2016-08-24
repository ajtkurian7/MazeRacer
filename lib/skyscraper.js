
const Player = require("./player.js");
const requestAnimationFrame = require("./request_animation_frame.js");
const maze = require("./maze.js");
const keyShortcuts = require("./key_shortcuts.js");
const Board = require("./board.js");

let player = new Player(25, 75, maze);
let board = new Board(50, player.movementGrid);


function draw() {
  keyShortcuts(player);
  drawPlayer();
}


function drawPlayer() {
  player.drawPlayerIcon();
  board.drawGrid(player.movementGrid);
  requestAnimationFrame(drawPlayer);
}



document.addEventListener("DOMContentLoaded", function() {
  draw();
});
