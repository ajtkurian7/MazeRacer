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
