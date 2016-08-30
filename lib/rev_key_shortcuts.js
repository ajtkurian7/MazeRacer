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
