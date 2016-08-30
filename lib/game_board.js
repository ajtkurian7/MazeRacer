function gameBoard(player, drawSquare) {

  for (var row = 0; row < player.grid.length; row++) {
    for (var col = 0; col < player.grid[row].length; col++) {
      let options = { color: player.colors[player.grid[row][col]],
                      size: player.squareSize,
                      pos: [col, row],
                      player2: player.player2
                    };

      if (player.grid[row][col] === null) { options.color = "lightgray"; }
      if (player.grid[row][col] >= 0) { drawSquare(options); }
    }
  }

}

module.exports = gameBoard;
