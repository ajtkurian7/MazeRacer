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

	

	function draw() {


	  drawGrid([
	    [1, 1, 1, 1],
	    [0, 2, 2, 4],
	    [0, 4, 3, 3],
	    [3, 4, 4, 3]
	  ]);
	}




	function drawSquare(options) {
	  let canvas = document.getElementById("board");
	  let ctx = canvas.getContext("2d");

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