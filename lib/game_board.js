function gameBoard(array, drawSquare, colors, size) {

  for (var row = 0; row < array.length; row++) {
    for (var col = 0; col < array[row].length; col++) {
      drawSquare({
        color: colors[array[row][col]],
        size: size,
        pos: [col, row]
      });
    }
  }

}

module.exports = gameBoard;
