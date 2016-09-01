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
	const requestAnimationFrame = __webpack_require__(5);
	const mazes = __webpack_require__(6);
	const Board = __webpack_require__(13);
	const PowerUp = __webpack_require__(16);
	const shuffle = __webpack_require__(7);
	// const MazeCreator = require("./maze_creator.js");
	//

	let player = new Player(25, 75, mazes[0]);
	let board = new Board(50, player.movementGrid);
	let powerUp1 = new PowerUp(player, board);

	let player2 = new Player(25, 75, mazes[1], true);
	let board2 = new Board(50, player2.movementGrid, true);
	let powerUp2 = new PowerUp(player2, board2);
	player.opponent = player2;
	player2.opponent = player;

	function drawPlayer() {
	  player.drawPlayerIcon();
	  player2.drawPlayerIcon();

	  let grid = board.grid;

	  board.drawGrid(player.movementGrid);
	  board2.drawGrid(player2.movementGrid);

	  let grid2 = board.grid;

	  powerUp1.checkForPowerUp(player, board);
	  powerUp2.checkForPowerUp(player2, board2);



	  player.keyboardInput();
	  player2.keyboardInput();

	  requestAnimationFrame(drawPlayer);
	}
	function modal () {
	  let modal = document.getElementById("myModal");
	  let btn = document.getElementById("btn");
	  btn.addEventListener("click", ()=> {
	    modal.style.display = "block";
	  });

	  window.onclick = function (event) {
	    if (event.target == modal) {
	      modal.style.display = "none";
	    }
	  };
	}

	document.addEventListener("DOMContentLoaded", () => {
	  modal();
	  player.keyboardInput();
	  player2.keyboardInput();
	  powerUp1.setKeyboardInput();
	  powerUp2.setKeyboardInput();
	  drawPlayer();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const judgeMovement = __webpack_require__(2);
	const movementGrid = __webpack_require__(3);
	const animate = __webpack_require__(4);
	const drawPlayerIcon = __webpack_require__(8);
	const keyShortcuts = __webpack_require__(9);
	const keyShortcuts2 = __webpack_require__(10);
	const revKeyShortcuts = __webpack_require__(11);
	const revKeyShortcuts2 = __webpack_require__(12);


	const Player = function (x, y, mazes, player2 = false) {
	  this.canvasId = (player2) ? "player2" : "player";

	  this.x = x;
	  this.y = y;
	  this.maze = mazes.shift();
	  this.movementGrid = movementGrid(this.maze);
	  this.mazeArray = mazes;
	  this.player2 = player2;
	  this.level = 1;
	  this.opponent = null;
	  this.powerUp = null;
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

	  // power up modifiers
	  this.reverseDirections = false;
	  this.speed = 150;
	  this.vanish = false;
	};

	Player.prototype.keyboardInput = function () {
	  if (!this.reverseDirections) {
	    if (this.player2) {
	      return keyShortcuts2(this);
	    } else {
	      return keyShortcuts(this);
	    }
	  } else {
	    if (this.player2) {
	      return revKeyShortcuts2(this);
	    } else {
	      return revKeyShortcuts(this);
	    }
	  }
	};

	Player.prototype.unbindAll = function() {
	  let keys = ['a', 's', 'd', 'w', 'shift+d', 'shift+a', 'shift+s', 'shift+w'];
	  let keys2 = ['i', 'j', 'k', 'l', 'space+i', 'space+j', 'space+k', 'space+l'];
	  if (this.player2) {
	    keys2.forEach((k) => {
	      key.unbind(k);
	    });
	  } else {
	    keys.forEach((k) => {
	      key.unbind(k);
	    });
	  }

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


	Player.prototype.reset = function() {
	  this.x = 25;
	  this.y = 75;
	  this.movementGrid = movementGrid(this.maze);


	  this.movesArray.forEach( (move) => {
	    this[move] = true;
	  });

	  this.canMoveUp= false;
	  this.canMoveLeft = false;
	  this.canJumpUp = false;
	  this.canJumpLeft = false;
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
	  this.displayLevel();
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

	Player.prototype.checkWin = function (prevPosVal) {
	  if (this.currentPosVal() === -2) {
	    if (this.includes(prevPosVal)) {
	      setTimeout(() => { this.reset(this.maze); }, 200);
	    } else {
	      if (this.mazeArray.length) {
	        this.level += 1;
	        setTimeout(() => {
	          this.maze = this.mazeArray.shift().slice();
	          this.reset();
	          this.resetPowerUp();
	        }, 200);
	      } else {
	        alert(this.player2 ? "Player 2 Wins" : "Player 1 Wins");
	        document.location.reload(true);
	      }
	    }
	  }
	};

	Player.prototype.resetPowerUp = function () {
	  let id = this.player2 ? 'power-up2' : 'power-up1';
	  let el = document.getElementById(id);
	  if (el.innerHTML === "") { this.powerUp = null; }
	};

	Player.prototype.displayLevel = function () {
	  let id = this.player2 ? "level2" : "level1";
	  let el = document.getElementById(id);

	  if (this.level === 6) {
	    el.innerHTML = "Boss Level";
	  } else {
	    el.innerHTML = this.level;
	  }
	};


	module.exports = Player;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const requestAnimationFrame = __webpack_require__(5);
	const maze = __webpack_require__(6);

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

	        player.checkWin(prevPosVal);

	        player.validateMoves();
	        if (player.judgeMovement().length === 0) {
	          setTimeout(function(){player.reset();}, 200);
	        }
	      }
	    };

	    return step();
	  },

	};

	module.exports = animate;


/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const shuffle = __webpack_require__(7);

	function maze () {
	  let easiestMaze;
	  let easyMazes = [];
	  let hardMazes = [];

	  hardMazes.push([
	    [3, 0, 3, 2, 4, 0, 0, 3],
	    [3, 0, 2, 4, 2, 3, 4, 3],
	    [0, 4, 0, 3, 0, 3, 4, 4],
	    [3, 1, 1, 3, 1, 1, 3, 3],
	    [3, 1, 1, 3, 0, 1, 3, 3],
	    [1, 1, 1, 3, 1, 1, 1, 3],
	    [4, 3, 0, 3, 4, 1, 3, 3],
	    [3, 4, 1, 3, 1, 1, 3, 4],
	  ]);

	  easyMazes.push([
	    [0, 2, 2, 2, 2],
	    [4, 2, 1, 0, 1],
	    [0, 0, 0, 0, 0],
	    [1, 0, 1, 0, 4],
	    [0, 3, 3, 3, 0],
	  ]);

	  easyMazes.push([
	    [1, 0, 2, 0, 3],
	    [1, 4, 0, 3, 0],
	    [1, 1, 1, 1, 1],
	    [2, 3, 2, 0, 1],
	    [0, 2, 3, 4, 1],
	  ]);
	  easyMazes.push([
	    [0, 3, 1, 3, 0],
	    [1, 0, 1, 0, 1],
	    [1, 1, 4, 4, 0],
	    [0, 2, 2, 2, 1],
	    [0, 1, 0, 3, 0],
	  ]);
	  easyMazes.push([
	    [1, 2, 0, 2, 1],
	    [0, 0, 3, 0, 0],
	    [1, 2, 1, 2, 1],
	    [0, 0, 3, 0, 0],
	    [1, 0, 1, 0, 1],
	  ]);
	  easiestMaze = [
	    [0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0],
	    [1, 1, 1, 1, 1],
	    [0, 0, 0, 0, 0],
	    [0, 0, 0, 0, 0],
	  ];

	  easyMazes.push([
	    [1, 0, 1, 0, 3],
	    [0, 2, 0, 2, 0],
	    [4, 2, 1, 2, 4],
	    [0, 2, 0, 2, 0],
	    [3, 0, 1, 0, 1],
	  ]);

	  easyMazes.push([
	    [4, 0, 4, 0, 0],
	    [1, 1, 1, 1, 1],
	    [0, 3, 3, 0, 0],
	    [0, 0, 2, 2, 2],
	    [0, 2, 2, 2, 1],
	  ]);

	  easyMazes.push([
	    [1, 0, 0, 2, 1],
	    [0, 2, 4, 2, 4],
	    [1, 2, 2, 2, 1],
	    [0, 0, 4, 2, 0],
	    [1, 4, 4, 0, 1],
	  ]);




	  hardMazes.push([
	    [3, 0, 3, 3, 4, 0, 0, 1],
	    [2, 2, 2, 4, 2, 3, 2, 1],
	    [0, 4, 0, 1, 0, 3, 4, 4],
	    [3, 1, 2, 3, 2, 2, 3, 3],
	    [3, 1, 1, 3, 0, 1, 3, 3],
	    [1, 1, 2, 2, 1, 2, 1, 3],
	    [4, 3, 0, 3, 4, 1, 3, 3],
	    [3, 4, 1, 3, 1, 1, 3, 4],
	  ]);

	  hardMazes.push([
	    [3, 0, 3, 0, 3, 3, 0, 0],
	    [0, 4, 0, 4, 0, 0, 4, 0],
	    [0, 0, 0, 4, 0, 0, 0, 0],
	    [1, 0, 1, 4, 0, 3, 0, 0],
	    [1, 0, 1, 0, 3, 0, 0, 0],
	    [1, 0, 1, 0, 0, 0, 0, 0],
	    [0, 0, 1, 1, 1, 0, 1, 0],
	    [0, 2, 2, 0, 2, 0, 2, 0]
	  ]);

	  hardMazes.push([
	    [0, 1, 1, 0, 1, 0, 2, 3],
	    [0, 1, 3, 0, 3, 0, 2, 0],
	    [0, 0, 1, 0, 1, 1, 0, 1],
	    [0, 1, 0, 0, 4, 0, 2, 0],
	    [2, 0, 1, 2, 0, 1, 0, 3],
	    [0, 1, 1, 1, 0, 1, 2, 0],
	    [0, 4, 4, 0, 4, 1, 4, 0],
	    [1, 1, 0, 2, 0, 1, 2, 3]
	  ]);

	  hardMazes.push([
	    [1, 2, 1, 0, 1, 2, 1, 0],
	    [0, 0, 0, 0, 2, 2, 0, 0],
	    [0, 2, 2, 0, 3, 0, 1, 1],
	    [3, 2, 0, 1, 1, 2, 0, 0],
	    [3, 0, 4, 0, 1, 0, 1, 1],
	    [0, 1, 0, 1, 1, 2, 1, 3],
	    [4, 3, 4, 0, 1, 0, 1, 3],
	    [4, 1, 0, 1, 0, 1, 0, 1]
	  ]);

	  let player1 = [];
	  let player2 = [];

	  player1.push(easiestMaze.slice());
	  player2.push(easiestMaze.slice());
	  easyMazes = easyMazes.slice(0,4);
	  hardMazes = shuffle(hardMazes);
	  player1 = player1.concat(shuffle(easyMazes.slice()));
	  player2 = player2.concat(shuffle(easyMazes.slice()));

	  player1.push(hardMazes[0]);
	  player2.push(hardMazes[0]);


	  return [player1, player2];


	}



	module.exports = maze();


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	function playerIcon(player, player2) {
	  let canvasId = (player2) ? "player2" : "player";
	  let playerCanvas = document.getElementById(canvasId);
	  let ctx = playerCanvas.getContext("2d");


	  ctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
	  if (!player.vanish) {
	    ctx.beginPath();

	    ctx.arc(player.x, player.y, 15, 0, 2 * Math.PI, false);
	    ctx.fillStyle = player2 ? 'lightblue' : 'purple';
	    ctx.fill();
	    ctx.lineWidth = 3;
	    ctx.strokeStyle = '#003300';
	    ctx.stroke();
	    ctx.closePath();
	  }

	}

	module.exports = playerIcon;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function (player) {
	  // key('w', function (e) {
	  //   e.stopPropagation();
	  //   if (player.canMoveUp) {player.animate('y', -50, 100);}
	  // });
	  // key('a', function (e) {
	  //   e.stopPropagation();
	  //   if (player.canMoveLeft){player.animate('x', -50, 100);}
	  // });
	  // key('s', function (e) {
	  //   e.stopPropagation();
	  //   if (player.canMoveDown) {player.animate('y', 50, 100);}
	  // });
	  // key('d', function (e) {
	  //   e.stopPropagation();
	  //   if (player.canMoveRight) {player.animate('x', 50, 100);}
	  // });
	  //
	  // key('shift+w', function (e) {
	  //   e.stopPropagation();
	  //   if (player.canJumpUp) {player.animate('y', -100, 150, true);}
	  // });
	  // key('shift+a', function(e) {
	  //   e.stopPropagation();
	  //   if (player.canJumpLeft){player.animate('x', -100, 150, true);}
	  // });
	  // key('shift+s', function (e) {
	  //   e.stopPropagation();
	  //   if (player.canJumpDown) {player.animate('y', 100, 150, true);}
	  // });
	  // key('shift+d', function (e) {
	  //   e.stopPropagation();
	  //   if (player.canJumpRight) {player.animate('x', 100, 150, true);}
	  // });

	    if (key.isPressed('s') && key.isPressed(16)) {
	      if (player.canJumpDown) { player.animate('y', 100, player.speed, true); }
	    }

	    if (key.isPressed('s')) {
	      if (player.canMoveDown) {player.animate('y', 50, player.speed); }
	    }
	    if (key.isPressed('w') && key.isPressed(16)) {
	      if (player.canJumpUp) { player.animate('y', -100, player.speed, true); }
	    }

	    if (key.isPressed('w')) {
	      if (player.canMoveUp) {player.animate('y', -50, player.speed);}
	    }

	    if (key.isPressed("a") && key.isPressed(16)) {
	      if (player.canJumpLeft) { player.animate('x', -100, player.speed, true); }
	    }

	    if (key.isPressed('a')) {
	      if (player.canMoveLeft) { player.animate('x', -50, player.speed); }
	    }
	    if (key.isPressed('d') && key.isPressed(16)) {
	      if (player.canJumpRight) { player.animate('x', 100, player.speed, true); }
	    }

	    if (key.isPressed("d")) {
	      if (player.canMoveRight) { player.animate('x', 50, player.speed); }
	    }



	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function (player) {
	  // key('i', function (e) {
	  //   e.preventDefault();
	  //   if (player.canMoveUp) {player.animate('y', -50, 100);}
	  // });
	  // key('j', function (e) {
	  //   e.preventDefault();
	  //   if (player.canMoveLeft){player.animate('x', -50, 100);}
	  // });
	  // key('k', function (e) {
	  //   e.preventDefault();
	  //   if (player.canMoveDown) {player.animate('y', 50, 100);}
	  // });
	  // key('l', function (e) {
	  //   e.preventDefault();
	  //   if (player.canMoveRight) {player.animate('x', 50, 100);}
	  // });
	  // key('alt+i', function (e) {
	  //   e.preventDefault();
	  //   if (player.canJumpUp) {
	  //     player.animate('y', -100, 150, true);
	  //   }
	  // });
	  // key('alt+j', function(e) {
	  //   e.preventDefault();
	  //   if (player.canJumpLeft){
	  //     player.animate('x', -100, 150, true);}
	  // });
	  // key('alt+k', function (e) {
	  //   e.preventDefault();
	  //   if (player.canJumpDown) {
	  //     player.animate('y', 100, 150, true);}
	  // });
	  // key('option+l', function (e) {
	  //   e.preventDefault();
	  //   if (player.canJumpRight) {
	  //     player.animate('x', 100, 150, true);}
	  // });

	  if (key.isPressed('k') && key.isPressed(32)) {
	    if (player.canJumpDown) { player.animate('y', 100, player.speed, true); }
	  }

	  if (key.isPressed('k')) {
	    if (player.canMoveDown) {player.animate('y', 50, player.speed); }
	  }
	  if (key.isPressed('i') && key.isPressed(32)) {
	    if (player.canJumpUp) { player.animate('y', -100, player.speed, true); }
	  }

	  if (key.isPressed('i')) {
	    if (player.canMoveUp) {player.animate('y', -50, player.speed);}
	  }

	  if (key.isPressed("j") && key.isPressed(32)) {
	    if (player.canJumpLeft) { player.animate('x', -100, player.speed, true); }
	  }

	  if (key.isPressed('j')) {
	    if (player.canMoveLeft) { player.animate('x', -50, player.speed); }
	  }
	  if (key.isPressed('l') && key.isPressed(32)) {
	    if (player.canJumpRight) { player.animate('x', 100, player.speed, true); }
	  }

	  if (key.isPressed("l")) {
	    if (player.canMoveRight) { player.animate('x', 50, player.speed); }
	  }




	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function (player) {
	  // key('s', function (e) {
	  //   if (player.canMoveUp) {player.animate('y', -50, 100);}
	  // });
	  // key('d', function (e) {
	  //   if (player.canMoveLeft){player.animate('x', -50, 100);}
	  // });
	  // key('w', function (e) {
	  //   if (player.canMoveDown) {player.animate('y', 50, 100);}
	  // });
	  // key('a', function (e) {
	  //   if (player.canMoveRight) {player.animate('x', 50, 100);}
	  // });
	  //
	  // key('shift+s', function (e) {
	  //   if (player.canJumpUp) {player.animate('y', -100, player.speed, true);}
	  // });
	  // key('shift+d', function(e) {
	  // });
	  // key('shift+w', function (e) {
	  //   if (player.canJumpDown) {player.animate('y', 100, 150, true);}
	  // });
	  // key('shift+a', function (e) {
	  //   if (player.canJumpRight) {player.animate('x', 100, 150, true);}
	  // });

	  if (key.isPressed('w') && key.isPressed(16)) {
	    if (player.canJumpDown) { player.animate('y', 100, player.speed, true); }
	  }

	  if (key.isPressed('w')) {
	    if (player.canMoveDown) {player.animate('y', 50, player.speed); }
	  }
	  if (key.isPressed('s') && key.isPressed(16)) {
	    if (player.canJumpUp) { player.animate('y', -100, player.speed, true); }
	  }

	  if (key.isPressed('s')) {
	    if (player.canMoveUp) {player.animate('y', -50, player.speed);}
	  }

	  if (key.isPressed("d") && key.isPressed(16)) {
	    if (player.canJumpLeft) { player.animate('x', -100, player.speed, true); }
	  }

	  if (key.isPressed('d')) {
	    if (player.canMoveLeft) { player.animate('x', -50, player.speed); }
	  }
	  if (key.isPressed('a') && key.isPressed(16)) {
	    if (player.canJumpRight) { player.animate('x', 100, player.speed, true); }
	  }

	  if (key.isPressed("a")) {
	    if (player.canMoveRight) { player.animate('x', 50, player.speed); }
	  }

	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function (player) {
	  // key('k', function (e) {
	  //   e.preventDefault();
	  //   if (player.canMoveUp) {player.animate('y', -50, 100);}
	  // });
	  // key('l', function (e) {
	  //   e.preventDefault();
	  //   if (player.canMoveLeft){player.animate('x', -50, 100);}
	  // });
	  // key('i', function (e) {
	  //   e.preventDefault();
	  //   if (player.canMoveDown) {player.animate('y', 50, 100);}
	  // });
	  // key('j', function (e) {
	  //   e.preventDefault();
	  //   if (player.canMoveRight) {player.animate('x', 50, 100);}
	  // });
	  // key('alt+k', function (e) {
	  //   e.preventDefault();
	  //   if (player.canJumpUp) {
	  //     player.animate('y', -100, 150, true);
	  //   }
	  // });
	  // key('alt+l', function(e) {
	  //   e.preventDefault();
	  //   if (player.canJumpLeft){
	  //     player.animate('x', -100, 150, true);}
	  // });
	  // key('alt+i', function (e) {
	  //   e.preventDefault();
	  //   if (player.canJumpDown) {
	  //     player.animate('y', 100, 150, true);}
	  // });
	  // key('alt+j', function (e) {
	  //   e.preventDefault();
	  //   if (player.canJumpRight) {
	  //     player.animate('x', 100, 150, true);}
	  // });


	  if (key.isPressed('i') && key.isPressed(32)) {
	    if (player.canJumpDown) { player.animate('y', 100, player.speed, true); }
	  }

	  if (key.isPressed('i')) {
	    if (player.canMoveDown) {player.animate('y', 50, player.speed); }
	  }

	  if (key.isPressed('k') && key.isPressed(32)) {
	    if (player.canJumpUp) { player.animate('y', -100, player.speed, true); }
	  }

	  if (key.isPressed('k')) {
	    if (player.canMoveUp) {player.animate('y', -50, player.speed);}
	  }

	  if (key.isPressed("l") && key.isPressed(32)) {
	    if (player.canJumpLeft) { player.animate('x', -100, player.speed, true); }
	  }

	  if (key.isPressed('l')) {
	    if (player.canMoveLeft) { player.animate('x', -50, player.speed); }
	  }
	  if (key.isPressed('j') && key.isPressed(32)) {
	    if (player.canJumpRight) { player.animate('x', 100, player.speed, true); }
	  }

	  if (key.isPressed("j")) {
	    if (player.canMoveRight) { player.animate('x', 50, player.speed); }
	  }

	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	const gameBoard = __webpack_require__(14);
	const drawSquare = __webpack_require__(15);
	const shuffle = __webpack_require__(7);

	const Board = function (squareSize, grid, isPlayer2 = false) {
	  this.grid = grid;
	  this.squareSize = squareSize;
	  this.colors = shuffle(["red", "green", "blue", "yellow", "orange"]);
	  this.player2 = isPlayer2;
	};

	Board.prototype.drawGrid = function (grid) {
	  this.grid = grid;
	  gameBoard(this, drawSquare);
	};

	Board.prototype.randPos = function () {
	  return Math.floor((Math.random() * (this.grid.length - 1)) + 1);
	};


	module.exports = Board;


/***/ },
/* 14 */
/***/ function(module, exports) {

	function gameBoard(player, drawSquare) {
	  let boardId = (!player.player2) ? "board" : "board2";
	  let canvas = document.getElementById(boardId);
	  let ctx = canvas.getContext("2d");

	  ctx.clearRect(0, 0, 600, 600);

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


/***/ },
/* 15 */
/***/ function(module, exports) {

	function drawSquare(options) {
	  let boardId = (!options.player2) ? "board" : "board2";
	  let canvas = document.getElementById(boardId);
	  let ctx = canvas.getContext("2d");
	  // ctx.clearRect(0, 0, 600, 600);
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	const shuffle = __webpack_require__(7);

	const PowerUp = function (player, board) {
	  let powerUps = ["freeze", "rotate", "reverse", "vanish", "slow", "flip"];
	  // ["freeze", "rotate", "reverse", "vanish", "slow"];
	  this.type = shuffle(powerUps)[0];
	  this.forPlayer = player;
	  this.board = board;
	  this.grid = board.grid;
	  this.xPos = board.randPos();
	  this.yPos = board.randPos();
	  this.xCanvas = () => { return 50 * this.yPos + 25; };
	  this.yCanvas = () => { return 50 * this.xPos + 75; };
	  this.Id = player.player2 ? "power-up2" : "power-up1";


	};

	PowerUp.prototype.setKeyboardInput = function () {
	  let letter = this.forPlayer.player2 ? "u" : "q";
	  let htmlLabel = document.getElementById(this.Id);
	  let that = this;
	  key(letter, function() {
	    if (htmlLabel.innerHTML) { that[that.type](); }
	  });
	};

	PowerUp.prototype.drawIcon = function() {
	  let canvas = document.getElementById(this.forPlayer.canvasId);
	  let ctx = canvas.getContext("2d");
	  ctx.beginPath();

	  ctx.arc(this.xCanvas(), this.yCanvas(), 15, 0, 2 * Math.PI, false);
	  ctx.fillStyle = "gold";
	  ctx.fill();
	  ctx.lineWidth = 3;
	  ctx.strokeStyle = '#003300';
	  ctx.stroke();
	  ctx.font = "5px Arial";
	  ctx.fillText("P", this.xCanvas(), this.yCanvas());
	  ctx.closePath();

	};

	PowerUp.prototype.checkForPowerUp = function (player) {
	  if (!player.powerUp) {

	    // listener when board changes update new location for the power up
	    if (this.grid !== this.board.grid) {
	      this.grid = this.board.grid;
	      this.xPos = this.board.randPos();
	      this.yPos = this.board.randPos();
	    }

	    let playerPos = [player.x, player.y];
	    let powerUpPos = [this.xCanvas(), this.yCanvas()];

	    if (playerPos.toString() === powerUpPos.toString()) {
	      player.powerUp = this.type;
	      let htmlLabel = document.getElementById(this.Id);
	      htmlLabel.innerHTML = htmlLabel.innerHTML || this.type.toUpperCase();
	    } else {
	      this.drawIcon();
	    }
	  }
	};

	PowerUp.prototype.freeze = function () {
	  // Freeze opponent for 5 seconds
	  this.displayPowerUp();

	  let trueMoves = [];
	  this.forPlayer.opponent.movesArray.forEach((move)=> {
	    if (this.forPlayer.opponent[move]) {
	      trueMoves.push(move);
	    }
	  });

	  this.forPlayer.opponent.allFalse();

	  setTimeout(() => {
	    trueMoves.forEach((move) => {
	      this.forPlayer.opponent[move] = true;
	    });

	  }, 5000);
	  this.clearPowerUp();
	};

	PowerUp.prototype.reverse = function() {
	  // reverse the opponents directions
	  this.displayPowerUp();

	  this.forPlayer.opponent.reverseDirections = true;
	  setTimeout(() => {
	    this.forPlayer.opponent.reverseDirections = false;
	  }, 5000);
	  this.clearPowerUp();

	};

	PowerUp.prototype.vanish = function() {
	  // Opponents icon disappears

	  this.forPlayer.opponent.vanish = true;
	  this.displayPowerUp();

	  setTimeout(() => {
	    this.forPlayer.opponent.vanish = false;
	  }, 5000);
	  this.clearPowerUp();

	};

	PowerUp.prototype.slow = function () {
	  this.forPlayer.opponent.speed = 800;

	  this.displayPowerUp();

	  setTimeout(() => {
	    this.forPlayer.opponent.speed = 150;
	  }, 5000);
	  this.clearPowerUp();
	};

	PowerUp.prototype.rotate = function() {
	  // Keeps rotating the board 360 degrees
	  this.displayPowerUp();

	  let isPlayer2 = this.forPlayer.opponent.player2;
	  let id = isPlayer2 ? "game2" : "game1";
	  let element = document.getElementById(id);

	  element.classList.add("spin");
	  setTimeout(() => {
	    element.classList.remove("spin");
	  }, 5000);
	  this.clearPowerUp();
	};

	PowerUp.prototype.flip = function () {
	  this.displayPowerUp();

	  let isPlayer2 = this.forPlayer.opponent.player2;
	  let id = isPlayer2 ? "game2" : "game1";
	  let element = document.getElementById(id);

	  element.classList.add("spin2");
	  setTimeout(() => {
	    element.classList.remove("spin2");
	  }, 5000);
	  this.clearPowerUp();
	};


	PowerUp.prototype.clearPowerUp = function () {
	  document.getElementById(this.Id).innerHTML = "";
	};

	PowerUp.prototype.displayPowerUp = function () {
	  let powerUp = this.forPlayer.powerUp;
	  let id = this.forPlayer.opponent.player2 ? powerUp + 2 : powerUp + 1;
	  let el = document.getElementById(id);

	  el.style.visibility = "visible";
	  setTimeout(() => {
	    el.style.visibility = "hidden";
	  }, 2000);
	};



	module.exports = PowerUp;


/***/ }
/******/ ]);