class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow")

    //write code to show a heading for showing the result of Quiz
    fill("black")
    textSize(30)
    text("Result of the Quiz", 350, 50)

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      var displayAnswers = 230
      //write code to add a note here
      fill("blue")
      textSize(20)
      text("NOTE: The contestant who answered correctly is highlighted in green colour", 110, 230)

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAnswer = "2"
      if(correctAnswer === allContestants[plr].answer){
        fill("green");
      } else{
        fill("red");
      }
      displayAnswers+=30
      textSize(20)
      text(allContestants[plr].name+":"+allContestants[plr].answer, 250, displayAnswers)
    }
  }
    
    
  }

}
