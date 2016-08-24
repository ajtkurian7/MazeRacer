/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	const Player = __webpack_require__(1);
	const requestAnimationFrame = __webpack_require__(3);
	const maze = __webpack_require__(9);
	const keyShortcuts = __webpack_require__(12);
	const keyShortcuts2 = __webpack_require__(14);
	const Board = __webpack_require__(13);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const judgeMovement = __webpack_require__(10);
	const movementGrid = __webpack_require__(11);
	const animate = __webpack_require__(2);
	const drawPlayerIcon = __webpack_require__(6);

	const Player = function (x, y, maze, player2 = false) {
	  this.x = x;
	  this.y = y;
	  this.movementGrid = movementGrid(maze);
	  this.player2 = player2;
	  this.movesArray =
	    [
	      "canMoveUp",
	      "canMoveDown",
	      "canMoveLeft",
	      "canMoveRight",
	      "canJumpUp",
	      "canJumpDown",
	      "canJumpLeft",
	      "canJumpRight"
	    ];
	  this.movesArray.forEach( (move) => {
	    this[move] = true;
	  });
	  this.canMoveUp= false;
	  this.canMoveLeft = false;
	  this.canJumpUp = false;
	  this.canJumpLeft = false;
	};

	Player.prototype.currentGridPos = function () {
	  return [(this.y - 75) / 50, (this.x - 25) / 50];
	};

	Player.prototype.currentPosVal = function () {
	  let pos = this.currentGridPos();
	  return this.movementGrid[pos[0]][pos[1]];
	};

	Player.prototype.nullPos = function () {
	  let pos = this.currentGridPos();
	  if (this.currentPosVal() >= 0) {
	    this.movementGrid[pos[0]][pos[1]] = null;
	  }
	};

	Player.prototype.includes = function (val) {
	  let grid = this.movementGrid;

	  for (let i = 0; i < grid.length; i++) {
	    if (grid[i].includes(val)) {return true;}
	  }

	  return false;
	};


	Player.prototype.reset = function(maze) {
	  this.x = 25;
	  this.y = 75;
	  this.movementGrid = movementGrid(maze);
	  this.canMoveUp= false;
	  this.canMoveLeft = false;
	  this.canJumpUp = false;
	  this.canJumpLeft = false;

	  this.movesArray.forEach( (move) => {
	    this[move] = true;
	  });
	};

	Player.prototype.fail = function() {
	  if (judgeMovement(this, this.movementGrid).length) {
	    return false;
	  } else {
	    return true;
	  }
	};

	Player.prototype.drawPlayerIcon = function () {
	  drawPlayerIcon(this, this.player2);
	};

	Player.prototype.animate = function (prop, distance, duration, jump = false) {
	  animate.translate(this, prop, distance, duration, jump);
	};

	Player.prototype.judgeMovement = function () {
	  return judgeMovement(this, this.movementGrid);
	};

	Player.prototype.validateMoves = function () {
	  this.allFalse();
	  let validMoves = this.judgeMovement();
	  validMoves.forEach( (validMove) => {
	    this[validMove] = true;
	  });
	};

	Player.prototype.allFalse = function () {
	  this.movesArray.forEach( (moveDirection) => {
	    this[moveDirection] = false;
	  });
	};


	module.exports = Player;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const requestAnimationFrame = __webpack_require__(3);
	const maze = __webpack_require__(9);
	const animate = {
	  translate (player, prop, distance, duration, jump= false) {
	    let prevPosVal = player.currentPosVal();
	    player.allFalse();
	    player.nullPos();
	    let start = new Date().getTime();
	    let end = start + duration;
	    let otherProp = prop === 'x' ? 'y' : 'x';
	    let current = player[prop];
	    let otherCurrent = player[otherProp];

	    let step = function () {
	      let timestamp = new Date().getTime();
	      let progress = Math.min((duration - (end - timestamp)) / duration, 1);
	      player[prop] = current + (distance * progress);

	      if (jump) {
	        player[otherProp] = otherCurrent + (-1 * distance/2 ) * Math.sin(progress *  Math.PI);
	      }

	      if (progress < 1) {
	        requestAnimationFrame(step);
	      } else {
	        if (player.currentPosVal() === -2) {
	          if (player.includes(prevPosVal)) {
	            setTimeout(function(){player.reset(maze);}, 200);
	          } else {
	            alert("YOU WIN!");
	          }
	        }
	        player.validateMoves();
	        if (player.judgeMovement().length === 0) {
	          setTimeout(function(){player.reset(maze);}, 200);
	        }
	      }
	    };

	    return step();
	  },

	};

	module.exports = animate;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports =
	    window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.msRequestAnimationFrame ||
	    window.oRequestAnimationFrame ||
	    function(callback) {
	      return setTimeout(callback, 1);
	    };


/***/ },
/* 4 */
/***/ function(module, exports) {

	function drawSquare(options) {
	  let boardId = (!options.player2) ? "board" : "board2";
	  let canvas = document.getElementById(boardId);
	  let ctx = canvas.getContext("2d");
	  ctx.clearRect(0, 0, ctx.width, ctx.height);
	  ctx.beginPath();
	  ctx.fillStyle = options.color;
	  ctx.strokeStyle = "black";
	  ctx.lineWidth = "2";
	  ctx.fillRect(
	    (options.pos[0] ) * options.size,
	    (options.pos[1] + 1) * options.size,
	    options.size,
	    options.size
	  );
	  ctx.strokeRect(
	    (options.pos[0] ) * options.size,
	    (options.pos[1] + 1) * options.size,
	    options.size,
	    options.size
	  );
	  ctx.closePath();

	}

	module.exports = drawSquare;


/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	function playerIcon(player, player2) {
	  let canvasId = (player2) ? "player2" : "player";
	  let playerCanvas = document.getElementById(canvasId);
	  let ctx = playerCanvas.getContext("2d");


	  ctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
	  ctx.beginPath();

	  ctx.arc(player.x, player.y, 15, 0, 2 * Math.PI, false);
	  ctx.fillStyle = 'purple';
	  ctx.fill();
	  ctx.lineWidth = 3;
	  ctx.strokeStyle = '#003300';
	  ctx.stroke();
	  ctx.closePath();

	}

	module.exports = playerIcon;


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ },
/* 8 */
/***/ function(module, exports) {

	function shuffle(array){
	  let randIndex = (arrLength) => Math.floor(Math.random() * arrLength);
	  let returnArr = [];
	  while (array.length > 0) {
	    let index = randIndex(array.length);
	    returnArr.push(array[index]);
	    array.splice(index, 1);
	  }

	  return returnArr;
	}
	module.exports = shuffle;


/***/ },
/* 9 */
/***/ function(module, exports) {

	function maze () {
	  let mazes = [];
	  mazes.push([
	    [3, 0, 3, 1, 4, 0, 0, 1],
	    [2, 2, 2, 4, 2, 3, 2, 1],
	    [0, 4, 0, 1, 0, 3, 4, 4],
	    [3, 1, 1, 3, 1, 1, 3, 3],
	    [3, 1, 1, 3, 0, 1, 3, 3],
	    [1, 1, 1, 3, 1, 1, 1, 3],
	    [4, 3, 0, 3, 4, 1, 3, 3],
	    [3, 4, 1, 3, 1, 1, 3, 4],
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


/***/ },
/* 10 */
/***/ function(module, exports) {

	const judgeMovement = function(player, movementGrid) {
	  let currentPos = [(player.x - 25) / 50, (player.y - 75) / 50];
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


/***/ },
/* 11 */
/***/ function(module, exports) {

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


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function (player) {
	  key('w', function (e) {
	    e.preventDefault();
	    if (player.canMoveUp) {player.animate('y', -50, 100);}
	  });
	  key('a', function (e) {
	    e.preventDefault();
	    if (player.canMoveLeft){player.animate('x', -50, 100);}
	  });
	  key('s', function (e) {
	    e.preventDefault();
	    if (player.canMoveDown) {player.animate('y', 50, 100);}
	  });
	  key('d', function (e) {
	    e.preventDefault();
	    if (player.canMoveRight) {player.animate('x', 50, 100);}
	  });
	  key('shift', function (e) {
	    e.preventDefault();
	  });
	  key('shift+w', function (e) {
	    e.preventDefault();
	    if (player.canJumpUp) {player.animate('y', -100, 150, true);}
	  });
	  key('shift+a', function(e) {
	    e.preventDefault();
	    if (player.canJumpLeft){player.animate('x', -100, 150, true);}
	  });
	  key('shift+s', function (e) {
	    e.preventDefault();
	    if (player.canJumpDown) {player.animate('y', 100, 150, true);}
	  });
	  key('shift+d', function (e) {
	    e.preventDefault();
	    if (player.canJumpRight) {player.animate('x', 100, 150, true);}
	  });
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	const gameBoard = __webpack_require__(7);
	const drawSquare = __webpack_require__(4);
	const shuffle = __webpack_require__(8);

	const Board = function (squareSize, grid, player2 = false) {
	  this.grid = grid;
	  this.squareSize = squareSize;
	  this.colors = shuffle(["red", "green", "blue", "yellow", "orange"]);
	  this.player2 = player2;
	};

	Board.prototype.drawGrid = function (grid) {
	  this.grid = grid;
	  gameBoard(this.grid, drawSquare, this.colors, this.squareSize, this.player2);
	};


	module.exports = Board;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function (player) {
	  key('i', function (e) {
	    e.preventDefault();
	    if (player.canMoveUp) {player.animate('y', -50, 100);}
	  });
	  key('j', function (e) {
	    e.preventDefault();
	    if (player.canMoveLeft){player.animate('x', -50, 100);}
	  });
	  key('k', function (e) {
	    e.preventDefault();
	    if (player.canMoveDown) {player.animate('y', 50, 100);}
	  });
	  key('l', function (e) {
	    e.preventDefault();
	    if (player.canMoveRight) {player.animate('x', 50, 100);}
	  });

	  key('⌘', function(e) {
	    e.preventDefault();
	  });
	  key('⌘+i', function (e) {
	    e.preventDefault();
	    if (player.canJumpUp) {
	      player.animate('y', -100, 150, true);
	    }
	  });
	  key('⌘+j', function(e) {
	    e.preventDefault();
	    if (player.canJumpLeft){
	      player.animate('x', -100, 150, true);}
	  });
	  key('⌘+k', function (e) {
	    e.preventDefault();
	    if (player.canJumpDown) {
	      player.animate('y', 100, 150, true);}
	  });
	  key('⌘+l', function (e) {
	    e.preventDefault();
	    if (player.canJumpRight) {
	      player.animate('x', 100, 150, true);}
	  });
	};


/***/ }
/******/ ]);