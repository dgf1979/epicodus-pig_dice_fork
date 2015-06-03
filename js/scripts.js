function Player(name) {
  this.name = name
  this.score = 0
  this.session = 0
}

Player.prototype.roll = function() {
  var result = (Math.floor(Math.random() * 6) + 1);
  if (result > 1) {
    this.session += result;
  } else {
    this.session = 0;
  }
  return result;
}

Player.prototype.hold = function() {
  this.score += this.session;
  this.session = 0;
  return this.score;
}

$(document).ready(function() {

  $("form#add-player-1").submit(function() {
    event.preventDefault();
    var name = $("input#player-1-name").val();
    var playerOne = new Player(name);
    $("#add-player-1").hide();
    $("#display-name-1").html('<h2>' + playerOne.name + '</h2>');
    $("#player-1-shake").click(function(event) {
      var roll1 = playerOne.roll();
      $("#player-1-roll").html('<h4>' + 'You rolled a: '  + roll1 + '</h4>');
        if (roll1 < 2) {
          $("#player-1-shake").hide();
          $("#player-1-hold").hide();
          $("#player-2-shake").show();
          $("#player-2-hold").show();
          var score = playerOne.score;
          $("#player-1-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
        } else {
          var session = playerOne.session;
          $("#player-1-session").html('<h3>' + 'Your session score is: ' + session + '</h3>');
        }
      });
    $("#player-1-hold").click(function(event) {
      score = playerOne.hold();
      if (score >= 100) {
        $("#player-2-shake").hide();
        $("#player-2-hold").hide();
        $("#player-1-shake").hide();
        $("#player-1-hold").hide();
        $("#player-1-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
        alert("PLAYER ONE WINS MOFO, OINK OINK");
      } else {
        $("#player-1-shake").hide();
        $("#player-1-hold").hide();
        $("#player-2-shake").show();
        $("#player-2-hold").show();
        $("#player-1-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
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
      var roll2 = playerTwo.roll();
      $("#player-2-roll").html('<h4>' + 'You rolled a: ' + roll2 + '</h4>');
      if (roll2 < 2) {
        $("#player-2-shake").hide();
        $("#player-2-hold").hide();
        $("#player-1-shake").show();
        $("#player-1-hold").show();
        var score = playerTwo.score;
        $("#player-2-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
      } else {
        var session = playerTwo.session;
        $("#player-2-session").html('<h3>'  + 'Your session score is: ' + session + '</h3>');
      }
    });
    $("#player-2-hold").click(function(event) {
      score = playerTwo.hold();
      if (score >= 100) {
        $("#player-2-shake").hide();
        $("#player-2-hold").hide();
        $("#player-1-shake").hide();
        $("#player-1-hold").hide();
        $("#player-2-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
        alert("PLAYER TWO WINS MOFO, OINK OINK");
      } else {
        $("#player-2-shake").hide();
        $("#player-2-hold").hide();
        $("#player-1-shake").show();
        $("#player-1-hold").show();
        $("#player-2-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
      }
    });
  });
});
