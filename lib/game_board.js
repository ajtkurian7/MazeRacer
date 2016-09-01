function gameBoard(board, drawSquare) {
  let boardId = (!board.player2) ? "board" : "board2";
  let canvas = document.getElementById(boardId);
  let ctx = canvas.getContext("2d");

  canvas.width = (board.grid.length + 2) * 50;
  canvas.height = canvas.width;
  ctx.clearRect(0, 0, 600, 600);

  for (var row = 0; row < board.grid.length; row++) {
    for (var col = 0; col < board.grid[row].length; col++) {
      let options = { color: board.colors[board.grid[row][col]],
                      size: board.squareSize,
                      pos: [col, row],
                      player2: board.player2
                    };

      if (board.grid[row][col] === null) { options.color = "lightgray"; }
      if (board.grid[row][col] >= 0) { drawSquare(options); }
    }
  }

}

module.exports = gameBoard;
