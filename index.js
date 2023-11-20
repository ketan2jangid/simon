var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];

var userClickedPattern = [];
var level = 0;

var keysActive = true;

$("button").click(buttonResponse);

$(document).on('keypress', () => nextSequence());

var ind = 0;
function buttonResponse() {
    var buttonPressed = $(this).attr('id');

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

    validateSequence(ind);

    playSound(buttonPressed);    
}


function nextSequence() {
    if(keysActive) {
        var randomNum = Math.floor(4*Math.random());

        var randomChosenColor = buttonColors[randomNum];

        $('#' + randomChosenColor).animate({opacity:0.3});

        setTimeout(
            function() {
                $('#' + randomChosenColor).animate({opacity: 1});
            }, 100
        );

        playSound(randomChosenColor);

        gamePattern.push(randomChosenColor);

        level++;
        
        $(".heading").text('Level ' + level);

        keysActive = false;
    }
}

function validateSequence(currentLevel) {
    console.log(currentLevel, userClickedPattern[currentLevel], gamePattern[currentLevel]);

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success');
        ind++;
    } else {
        console.log('failed');

        resetAll();
        return;
    }

    console.log(userClickedPattern.length, gamePattern.length);

    if(userClickedPattern.length === gamePattern.length) {
        console.log("level up!");

        ind = 0;
        userClickedPattern = [];

        keysActive = true;

        setTimeout(
            () => nextSequence(),
            1000,
        )
    }
}

function resetAll() {
    userClickedPattern = [];
    gamePattern = [];

    ind = 0;
    level = 0;
    keysActive = true;

    $(".heading").text("Game over! Press any key to start");

    $("body").css("background-color", "red");

    setTimeout(
        function() {
            $("body").css("background-color", "rgb(3, 18, 49)");

            playSound('wrong');
        }, 200
    )
}

function playSound(button) {
    var sound = new Audio("sounds/" + button + ".mp3");

    sound.play();
}