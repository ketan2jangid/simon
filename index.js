var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];


$("button").click(buttonResponse);

function buttonResponse() {
    var buttonPressed = $(this).attr('id');

    playSound(buttonPressed);
    
}

function playSound(button) {
    var sound = new Audio("sounds/" + button + ".mp3");

    sound.play();
}

function nextSequence() {
    let randomNum = Math.floor(4*Math.random());

    let randomChosenColor = buttonColors[randomNum];

    gamePattern.push(randomChosenColor);
}