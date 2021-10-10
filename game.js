var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var gamePattern = [];


var started = false;
var level = 0;



$("h1").click(function () {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {

  var userChosenColor = $(this).attr("id");


  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);


  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level  " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);


  //flash up the button for next time click.

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //play sound with respect to the chosen button.
  playSound(randomChosenColor);


}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() { nextSequence();}, 1000);
     }
  }
  else {

    playSound("wrong");

    $("body").addClass("game-over");

   $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function (){
     $("body").removeClass("game-over");},200);



   startOver();
  }
}


function startOver()
{
  level=0;
  started=false;
  gamePattern = [];
}

function playSound(name) {
  var audio = new Audio( name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");}, 100);

}
