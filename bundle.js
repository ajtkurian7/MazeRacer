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
	const animate = __webpack_require__(2);
	const requestAnimationFrame = __webpack_require__(3);
	const drawSquare = __webpack_require__(4);
	const drawPlayerIcon = __webpack_require__(6);
	const gameBoard = __webpack_require__(7);
	const shuffle = __webpack_require__(8);
	const maze = __webpack_require__(9);
	const judgeMovement = __webpack_require__(10);
	const movementGrid = __webpack_require__(11);
	const keyShortcuts = __webpack_require__(12);

	let player = new Player(25, 75, maze);
	const COLORS =["red", "green", "blue", "yellow", "orange"];


	function draw() {
	  player.canJumpRight = true;
	  keyShortcuts(player);
	  drawGrid(maze);
	  drawPlayer();
	}


	function drawPlayer() {

	  drawPlayerIcon(player);

	  requestAnimationFrame(drawPlayer);
	}


	function drawGrid(array) {
	  let gridSize = 50;
	  colors = shuffle(COLORS);

	  gameBoard(array, drawSquare, colors, gridSize);

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

	const Player = function (x, y, maze) {
	  this.x = x;
	  this.y = y;
	  this.movementGrid = movementGrid(maze);
	  this.canMoveUp= true;
	  this.canMoveDown = true;
	  this.canMoveLeft = true;
	  this.canMoveRight = true;
	  this.trueMovesArray = [];
	  this.movesArray =
	    [
	      "canMoveUp",
	      "canMoveDown",
	      "canMoveLeft",
	      "canMoveRight"
	    ];
	};

	Player.prototype.animate = function (prop, distance, duration, jump = false) {
	  animate.translate(this, prop, distance, duration, jump);
	};

	Player.prototype.validateMoves = function () {
	  this.allFalse();
	  let validMoves = judgeMovement(this, this.movementGrid);
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
	const animate = {
	  translate (player, prop, distance, duration, jump= false) {
	    player.allFalse();
	    let start = new Date().getTime();
	    let end = start + duration;
	    let current = player[prop];
	    let currentY = player.y;

	    let step = function () {
	      let timestamp = new Date().getTime();
	      let progress = Math.min((duration - (end - timestamp)) / duration, 1);
	      player[prop] = current + (distance * progress);

	      if (prop === "x" && jump) {
	        player.y = currentY + (-1 * distance/2 ) * Math.sin(progress *  Math.PI);
	      }

	      if (progress < 1) {
	        requestAnimationFrame(step);
	      } else {
	        player.validateMoves();
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
	  let canvas = document.getElementById("board");
	  let ctx = canvas.getContext("2d");
	  ctx.beginPath();
	  ctx.fillStyle = options.color;
	  ctx.strokeStyle = "black";
	  ctx.lineWidth = "2";
	  ctx.fillRect(
	    (options.pos[0] + 1) * options.size,
	    (options.pos[1] + 1) * options.size,
	    options.size,
	    options.size
	  );
	  ctx.strokeRect(
	    (options.pos[0] + 1) * options.size,
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

	function playerIcon(player) {
	  let playerCanvas = document.getElementById("player");
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

	module.exports = [
	  [1, 0, 1, 1],
	  [2, 2, 2, 4],
	  [0, 4, 2, 2],
	  [3, 4, 4, 3]
	];


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
	      // Use toString to compare arrays with having references
	      // messing with conditionals
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
	  key('w', function () {
	    if (player.canMoveUp) {player.animate('y', -50, 100);}
	  });
	  key('a', function () {
	    if (player.canMoveLeft){player.animate('x', -50, 100);}
	  });
	  key('s', function () {
	    if (player.canMoveDown) {player.animate('y', 50, 100);}
	  });
	  key('d', function () {
	    if (player.canMoveRight) {player.animate('x', 50, 100);}
	  });
	  key('shift+w', function () {
	    if (player.canJumpUp) {player.animate('y', -100, 150, true);}
	  });
	  key('shift+a', function() {
	    if (player.canJumpLeft){player.animate('x', -100, 150, true);}
	  });
	  key('shift+w', function () {
	    if (player.canJumpDown) {player.animate('y', 100, 150, true);}
	  });
	  key('shift+d', function () {
	    if (player.canJumpRight) {player.animate('x', 100, 150, true);}
	  });
	};


/***/ }
/******/ ]);