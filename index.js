var colors = ["green", "red", "yellow", "blue"];

var toClick = [];
var level = 1;
var gameOver = true;
var clickCount = 0;

// ------------- Utilities ----------------------

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function sound(which) {
  var sound = new Audio("sounds/" + which + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// --------------- Game code --------------------

function pushColor() {
  var toAdd = getRndInteger(0, 4);
  toClick.push(colors[toAdd]);
  $("#" + colors[toAdd]).fadeIn(100).fadeOut(100).fadeIn(100);
  sound(colors[toAdd]);
}

function startGame() {
  toClick = [];
  level = 1;
  $("#level-title").text("Level " + level);
  pushColor();
  clickCount = 0;
}

function nextSequence() {
  pushColor();
  clickCount = 0;
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function() {
  if(!gameOver) {
    if($(this).hasClass(toClick[clickCount])) {
      animatePress(toClick[clickCount]);
      sound(toClick[clickCount]);
      if(clickCount == (toClick.length - 1)) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      } else {
        clickCount++;
      }
    } else {
      gameOver = true;
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      sound("wrong");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    }
  }
});

document.addEventListener("keypress", function() {
  if(gameOver) {
    gameOver = false;
    startGame();
  }
});
