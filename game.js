var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;

/*
$(document).click(function(){
 alert("I got a click!");    
}) */

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //Chama a função para verificar a resposta.
    

    playSound(userChosenColour);
    animatepress(userChosenColour);

});

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence ();
        started = true;
    }
});

function nextSequence(){
//Atualiza o nível.
    level++;
//Atualiza o texto do H1.
    $("#level-title").text("Level " + level);
//Geração da sequencia.
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoseColour = buttonColours[randomNumber];
    gamePattern.push(randomChoseColour);
     
//Animação do botão.
    $("#"+randomChoseColour).fadeOut(100).fadeIn(100);
//Chama a função de tocar o som.
    playSound(randomChoseColour); 

}

function checkAnswer(currentLevel){

}

function playSound(name){
    var audiotoPlay = new Audio("sounds/" + name+".mp3");
    audiotoPlay.play();  
}

function animatepress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed"); }, 100);
}

