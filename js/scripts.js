var aiIsPlaying = false;
var playerOne = new Player("Player1");
var playerTwo = new Player("Player2");

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


// START PLAYER 1'S TURN
var player1startTurn = function() {
  $("#player-2-shake").hide();
  $("#player-2-hold").hide();
  $("#player-1-shake").show();
  $("#player-1-hold").show();
}

// START PLAYER 2's TURN
var player2startTurn = function() {
  $("#player-1-shake").hide();
  $("#player-1-hold").hide();
  $("#player-2-shake").show();
  $("#player-2-hold").show();

  if (aiIsPlaying === true) { aiPlay(0) };
}

// AI Player 2 logic
var aiPlay = function(turnScore) {
  console.log("AI checking..");
  console.log("AI turn score is: " + turnScore);

  if (turnScore < 20) {
    setTimeout(function(){
      console.log("AI is rolling");
      $("#player-2-shake").trigger("click");
    }, 1000);
  } else {
    setTimeout(function(){
      console.log("AI is holding");
      $("#player-2-hold").trigger("click");
    }, 1000);
  }
}

// animate the party pig
function pigLoop() {
    console.log("animating..");
    $({deg: -40}).animate({deg: 20}, {
        duration: 1000,
        step: function(now) {
            $('#party_pig').css({
                transform: 'rotate(' + now + 'deg)'
            });
        }, complete: function(){ pigLoopLeft() }
    });
}

function pigLoopLeft() {
    console.log("animating..");
    $({deg: 20}).animate({deg: -40}, {
        duration: 1000,
        step: function(now) {
            $('#party_pig').css({
                transform: 'rotate(' + now + 'deg)'
            });
        }, complete: function(){ pigLoop() }
    });
}

// WIN
var win = function() {
  $(".pig").show();
  pigLoop();
  $(".background").show();

  var horn = document.getElementById("party_horn");
  horn.play();
  var clapping = document.getElementById("clapping");
  clapping.play();
}


$(document).ready(function() {

  $("#new-game").show();

  // game type select handlers
  $("#single-player").click(function () {
    $("#new-game").hide();
    aiIsPlaying = true;
  });
  $("#multi-player").click(function () {
    $("#new-game").hide();
  });

  player1startTurn();

  //PLAYER 1
  $("form#add-player-1").submit(function() {
    // PLAYER 1 NAME
    event.preventDefault();
    var name = $("input#player-1-name").val();
    var playerOne = new Player(name);
    $("#add-player-1").hide();
    $("#display-name-1").html('<h2>' + playerOne.name + '</h2>');

    //PLAYER 1 ROLLS
    $("#player-1-shake").click(function(event) {
      var roll1 = playerOne.roll();
      var littlePigsHTML = "";
      for (var i = 0; i < roll1; i++) {
        littlePigsHTML += '<img class="little-pig player1littlePig" src="./img/pig_icon.png" alt="piggy" />';
      }

      $("#player-1-roll").html('<h4>' + littlePigsHTML + '</h4>');
        // animate the little pigs
        $( ".player1littlePig" ).animate({
          opacity: 1,
          left: "+=50",
          height: "20px"
        }, 800, function() {});

        if (roll1 < 2) {
          player2startTurn();
          var score = playerOne.score;
          $("#player-1-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
          $("#player-1-session").html('<h3>' + 'Your session score is: 0</h3>');
        } else {
          var session = playerOne.session;
          $("#player-1-session").html('<h3>' + 'Your session score is: ' + session + '</h3>');
        }

      });

    //PLAYER 1 HOLDS
    $("#player-1-hold").click(function(event) {
      score = playerOne.hold();
      if (score >= 10) {  //WIN
        $("#player-2-shake").hide();
        $("#player-2-hold").hide();
        $("#player-1-shake").hide();
        $("#player-1-hold").hide();
        $("#player-1-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
        // alert("PLAYER ONE WINS MOFO, OINK OINK");
        win();
      } else { //NEXT PLAYER
        player2startTurn();
        $("#player-1-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
        $("#player-1-session").html('<h3>' + 'Your session score is: 0</h3>');
      }
    });
  });

  // PLAYER 2
  $("form#add-player-2").submit(function() {
    event.preventDefault();
    // PLAYER 2 NAME
    var name = $("input#player-2-name").val();
    var playerTwo = new Player(name);
    $("#add-player-2").hide();
    $("#display-name-2").html('<h2>' + playerTwo.name + '</h2>');

    // PLAYER 2 ROLLS
    $("#player-2-shake").click(function(event) {
      var roll2 = playerTwo.roll();

      var littlePigsHTML = "";
      for (var i = 0; i < roll2; i++) {
        littlePigsHTML += '<img class="little-pig player2littlePig" src="./img/pig_icon.png" alt="piggy" />';
      }

      $("#player-2-roll").html('<h4>' + littlePigsHTML + '</h4>');
        // animate the little pigs
        $( ".player2littlePig" ).animate({
          opacity: 1,
          left: "+=50",
          height: "20px"
        }, 800, function() {});

      if (roll2 < 2) {
        player1startTurn();
        var score = playerTwo.score;
        $("#player-2-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
        $("#player-2-session").html('<h3>'  + 'Your session score is: 0</h3>');
      } else {
        var session = playerTwo.session;
        if (aiIsPlaying === true) { aiPlay(playerTwo.session) };
        $("#player-2-session").html('<h3>'  + 'Your session score is: ' + session + '</h3>');
      }



    });

    // PLAYER 2 HOLDS
    $("#player-2-hold").click(function(event) {
      score = playerTwo.hold();
      if (score >= 10) {
        $("#player-2-shake").hide();
        $("#player-2-hold").hide();
        $("#player-1-shake").hide();
        $("#player-1-hold").hide();
        $("#player-2-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
        win();
      } else {
        player1startTurn();
        $("#player-2-score").html('<h3>' + 'Your total score is: ' + score + '</h3>');
        $("#player-2-session").html('<h3>'  + 'Your session score is: 0</h3>');
      }
    });
  });
});
