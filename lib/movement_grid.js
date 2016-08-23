function movementGrid (grid) {
  let returnGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i].slice();
    row.unshift(-1);
    row.push(-2);
    returnGrid.push(row);
  }

  return returnGrid;
}

module.exports = movementGrid;
