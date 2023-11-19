var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];

var userClickedPattern = [];
var currentLevel = 0;

$("button").click(buttonResponse);

$(document).on('keypress', () => nextSequence());

function buttonResponse() {
    var buttonPressed = $(this).attr('id');

    userClickedPattern.push(buttonPressed);

    // console.log(userClickedPattern);

    $('#' + buttonPressed).addClass("button-shadow");
    $('#' + buttonPressed).css('background-color', 'grey');

    setTimeout(
        function() {
            $('#' + buttonPressed).css('background-color', buttonPressed);
            $('#' + buttonPressed).removeClass("button-shadow");
        }, 100
    )

    userClickedPattern.push(buttonPressed);

    validateSequence(userClickedPattern.length - 1);

    playSound(buttonPressed);
    
}


function nextSequence() {
    let randomNum = Math.floor(4*Math.random());

    let randomChosenColor = buttonColors[randomNum];

    $('#' + randomChosenColor).animate({opacity:0.3});

    setTimeout(
        function() {
            $('#' + randomChosenColor).animate({opacity: 1});
        }, 100
    );

    playSound(randomChosenColor);

    gamePattern.push(randomChosenColor);

    currentLevel++;

    $(".heading").text('Level ' + currentLevel);

    validateSequence(currentLevel);
}

function validateSequence(level) {
    var flag = true;

    for(var i=0; i<=level; i++) {
        if(userClickedPattern[i] !== gamePattern[i]){
            console.log("game over");

            flag = false;
            break;
        }
    }

    if(flag) {
        console.log("success");
    }

}

function playSound(button) {
    var sound = new Audio("sounds/" + button + ".mp3");

    sound.play();
}