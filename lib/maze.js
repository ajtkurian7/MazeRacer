function maze () {
  let mazes = [];
  mazes.push([
    [3, 0, 3, 1],
    [2, 2, 2, 4],
    [0, 4, 2, 1],
    [3, 2, 1, 3]
  ]);

  mazes.push([
    [1, 0, 1, 1],
    [2, 2, 2, 4],
    [0, 4, 2, 2],
    [3, 4, 4, 3]
  ]);

  mazes.push([
    [1, 0, 1, 1],
    [2, 2, 2, 1],
    [0, 1, 2, 0],
    [2, 4, 2, 3]
  ]);

  mazes.push([
    [1, 0, 1, 1],
    [2, 2, 2, 1],
    [0, 4, 2, 2],
    [3, 4, 4, 3]
  ]);

  return mazes[Math.floor(Math.random() * (mazes.length))];

}




module.exports = maze();
