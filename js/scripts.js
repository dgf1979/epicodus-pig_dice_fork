function Player(name) {
  this.name = name
  this.score = 0
}

Player.prototype.roll = function() {
  var result = (Math.floor(Math.random() * 6) + 1);
  if (result === 1) {
    this.score += 0;
  } else {
    this.score += result;
  }
  return result;
}
