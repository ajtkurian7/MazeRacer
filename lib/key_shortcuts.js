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
