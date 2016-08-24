module.exports = function (player) {
  key('i', function (e) {
    e.preventDefault();
    if (player.canMoveUp) {player.animate('y', -50, 100);}
  });
  key('j', function (e) {
    e.preventDefault();
    if (player.canMoveLeft){player.animate('x', -50, 100);}
  });
  key('k', function (e) {
    e.preventDefault();
    if (player.canMoveDown) {player.animate('y', 50, 100);}
  });
  key('l', function (e) {
    e.preventDefault();
    if (player.canMoveRight) {player.animate('x', 50, 100);}
  });

  key('⌘', function(e) {
    e.preventDefault();
  });
  key('⌘+i', function (e) {
    e.preventDefault();
    if (player.canJumpUp) {
      player.animate('y', -100, 150, true);
    }
  });
  key('⌘+j', function(e) {
    e.preventDefault();
    if (player.canJumpLeft){
      player.animate('x', -100, 150, true);}
  });
  key('⌘+k', function (e) {
    e.preventDefault();
    if (player.canJumpDown) {
      player.animate('y', 100, 150, true);}
  });
  key('⌘+l', function (e) {
    e.preventDefault();
    if (player.canJumpRight) {
      player.animate('x', 100, 150, true);}
  });
};
