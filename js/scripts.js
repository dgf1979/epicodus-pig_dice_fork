function Player(name) {
  this.name = name
  this.score = 0
}

Player.prototype.roll = function() {
  var result = (Math.floor(Math.random() * 6) + 1);
  if (result > 1) {
    this.score += result;
  } else {
    null;
  }
  return result;
}

$(document).ready(function() {

  $("form#add-player-1").submit(function() {
    event.preventDefault();
    var name = $("input#player-1-name").val();
    var playerOne = new Player(name);
    $("#add-player-1").hide();
    $("#display-name-1").html('<h2>' + playerOne.name + '</h2>');
    $("#player-1-shake").click(function(event) {
      // var playerOne = new Player($(this).find("input#player-1-name"))
      playerOne.roll();
      $("#player-1-roll").html('<h4>' + playerOne.roll() + '</h4>');
        if (playerOne.roll() < 2) {
          $("#player-1-shake").hide();
          $("#player-1-hold").hide();
          $("#player-2-shake").show();
          $("#player-2-hold").show();
          var score = playerOne.score;
          $("#player-1-score").html('<h3>' + score + '</h3>');
        } else {
          var score = playerOne.score;
          $("#player12-score").html('<h3>' + score + '</h3>');
        }
    });
  });

  $("form#add-player-2").submit(function() {
    event.preventDefault();
    var name = $("input#player-2-name").val();
    var playerTwo = new Player(name);
    $("#add-player-2").hide();
    $("#display-name-2").html('<h2>' + playerTwo.name + '</h2>');
    $("#player-2-shake").click(function(event) {
      playerTwo.roll();
      $("#player-2-roll").html('<h4>' + playerTwo.roll() + '</h4>');
      if (playerTwo.roll() < 2) {
        $("#player-2-shake").hide();
        $("#player-2-hold").hide();
        $("#player-1-shake").show();
        $("#player-1-shake").show();
        $("#player-1-hold").show();
        var score = playerTwo.score;
        $("#player-2-score").html('<h3>' + score + '</h3>');
      } else {
        var score = playerTwo.score;
        $("#player-2-score").html('<h3>' + score + '</h3>');
      }
    });
  });
});
