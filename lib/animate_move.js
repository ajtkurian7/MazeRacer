const requestAnimationFrame = require("./request_animation_frame.js");
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
