var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userCLickPattern = [];

var started = false;

var level = 0;


$(document).keypress(function(){
    if (!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");

    userCLickPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userCLickPattern.length-1);
});



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userCLickPattern[currentLevel]){
        // console.log(success);

        if(userCLickPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);

        }

    }else{
        // console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over,Press Any Key to Restart");
        
        setTimeout(function(){
        $("body").removeClass("game-over");
        },2000);


        startOver();
    }
}

function nextSequence(){
    
    userCLickPattern = [];

    level++;
    $("#level-title").text("level "+level);
    
    var randomNumber = Math.floor(Math.random()*4);//it will give value from 0 to 3
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    

   
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
    


}

function playSound(name){
    var audio = new Audio ("sounds/" + name +".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}