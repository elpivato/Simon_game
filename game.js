var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

/*
$(document).click(function(){
 alert("I got a click!");    
}) */

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence ();
        started = true;
    }
});

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //Chama a função para verificar a resposta.
    
    //Som.
    playSound(userChosenColour);
    //Animação do botão
    animatepress(userChosenColour);
    //Passar a resposta do usuário para checar.
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){
    //Zera a sequencia do usuário.
    userClickedPattern = [];

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
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

     //   console.log("success");
  
          if (userClickedPattern.length === gamePattern.length){
  
            setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
    
    //Play Audio
      var audioWrong = new Audio("/sounds/wrong.mp3.");
      audioWrong.play();

    //Add Style to Body.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

    //Change title.
      $("#level-title").text("Game Over, Press Any Key to Restart");

    //Start Over.
    startOver();    
      }
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

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
