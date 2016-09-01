const requestAnimationFrame = require("./request_animation_frame.js");
const maze = require("./maze.js");

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
