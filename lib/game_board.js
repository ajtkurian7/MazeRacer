function gameBoard(array, drawSquare, colors, size, player2) {

  for (var row = 0; row < array.length; row++) {
    for (var col = 0; col < array[row].length; col++) {
      let options = { color: colors[array[row][col]],
                      size: size,
                      pos: [col, row],
                      player2: player2
                    };

      if (array[row][col] === null) { options.color = "lightgray"; }
      if (array[row][col] >= 0) { drawSquare(options); }
    }
  }

}

module.exports = gameBoard;
