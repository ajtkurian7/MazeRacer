const judgeMovement = function(player, movementGrid) {
  let currentPos = [(Math.round(player.x) - 25) / 50, (Math.round(player.y) - 75) / 50];
  return validMoves(possibleMoves());

  function possibleMoves () {
    let moveDiff = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 2],
      [2, 0],
      [0, -2],
      [-2, 0]
    ];

    let possMoves = [];

    for (let i = 0; i < moveDiff.length; i++) {
      possMoves.push([]);
      for (var j  = 0; j < moveDiff[i].length; j++) {
        possMoves[i][j] = currentPos[j] + moveDiff[i][j];
      }
    }
    return possMoves;
  }

  function validMoves(possMoves) {
    let valid = [];
    let currentVal = movementGrid[currentPos[1]] && movementGrid[currentPos[1]][currentPos[0]];

    possMoves.forEach((move)=>{
      let possibleMoveVal = movementGrid[move[1]] && movementGrid[move[1]][move[0]];
      if (currentPos[0] === 0){   // If player is in the first column
        if (Number.isInteger(possibleMoveVal)) {  // If the number is an integer
          valid.push(move);
        }
      } else if (currentVal === possibleMoveVal || possibleMoveVal == -2) {
        valid.push(move);
      }
    });
    return validPlayerMovement(valid);
  }

  function validPlayerMovement(validMovesArray) {
    let returnArr = [];
    validMovesArray.forEach( (move) => {
      let diff = [move[0] - currentPos[0], move[1] - currentPos[1]];
      // Use toString to compare arrays
      switch (diff.toString()) {
        case [0, -1].toString():
          returnArr.push("canMoveUp");
          break;
        case [0, 1].toString():
          returnArr.push("canMoveDown");
          break;
        case [1, 0].toString():
          returnArr.push("canMoveRight");
          break;
        case [-1, 0].toString():
          returnArr.push("canMoveLeft");
          break;
        case [0, -2].toString():
          returnArr.push("canJumpUp");
          break;
        case [0, 2].toString():
          returnArr.push("canJumpDown");
          break;
        case [2, 0].toString():
          returnArr.push("canJumpRight");
          break;
        case [-2, 0].toString():
          returnArr.push("canJumpLeft");
          break;
      }
    });
    return returnArr;
  }
};

module.exports = judgeMovement;
