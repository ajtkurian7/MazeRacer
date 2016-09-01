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
