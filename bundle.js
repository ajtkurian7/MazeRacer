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
/***/ function(module, exports) {

	
	let up = false;
	let down = false;
	let right = false;
	let left = false;
	let x = 25;
	let y = 25;

	function draw() {

	  document.addEventListener("keydown", keyDownHandler, false);

	  drawGrid([
	    [1, 0, 1, 1],
	    [0, 2, 2, 4],
	    [0, 4, 2, 2],
	    [3, 4, 4, 3]
	  ]);

	  drawPlayer();

	}

	function keyDownHandler(e) {
	  switch (e.keyCode) {
	    case 87:
	      y -= 50;
	      break;

	    case 65:
	      x -= 50;
	      break;

	    case 83:
	      y += 50;
	      break;

	    case 68:
	      x += 50;
	      break;
	  }
	}

	function drawPlayer() {
	  let playerCanvas = document.getElementById("player");
	  let ctx = playerCanvas.getContext("2d");


	  ctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
	  ctx.beginPath();

	  ctx.arc(x, y, 15, 0, 2 * Math.PI, false);
	  ctx.fillStyle = 'purple';
	  ctx.fill();
	  ctx.lineWidth = 3;
	  ctx.strokeStyle = '#003300';
	  ctx.stroke();
	  ctx.closePath();

	  setTimeout(drawPlayer, 10);
	}

	// function playerMovement(x, y) {
	//   let up = false;
	//   let down = false;
	//   let right = false;
	//   let left = false;
	//
	//   document.addEventListener("keydown", keyDownHandler, false);
	//   document.addEventListener("keyup", keyUpHandler, false);
	//
	//
	//
	  // function keyDownHandler(e) {
	  //   switch (e.keycode) {
	  //     case 87:
	  //       up = true;
	  //       break;
	  //
	  //     case 65:
	  //       left = true;
	  //       break;
	  //
	  //     case 83:
	  //       down = true;
	  //       break;
	  //
	  //     case 68:
	  //       right = true;
	  //       break;
	  //   }
	  // }
	//
	//   function keyUpHandler(e) {
	//     switch (e.keycode) {
	//       case 87:
	//         up = false;
	//         break;
	//
	//       case 65:
	//         left = false;
	//         break;
	//
	//       case 83:
	//         down = false;
	//         break;
	//
	//       case 68:
	//         right = false;
	//         break;
	//     }
	//   }
	// }

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

	function drawGrid(array) {
	  let size = 50;
	  let colors = ["red", "green", "blue", "yellow", "orange"];
	  colors = shuffle(colors);

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

	document.addEventListener("DOMContentLoaded", function() {
	  draw();
	});


/***/ }
/******/ ]);