const question = document.getElementById('question');
//this is pretty cool hehe 
const choices =  Array.from(document.getElementsByClassName('choiceText'));
const questionCounterText = document.getElementById('QuestionCounter');
const scoreText = document.getElementById('Score');

let currentQuestion  = [];
let score  = 0;
let questionCount = 0;
let availebleQuestions = [];


let timeInterval = null;
let bar = document.getElementById("Bar");
let seconds = document.getElementById("seconds");




let questions = [
    {
      question: "Why is Java Web so bad?",
      choice1: "Its not made for the web",
      choice2: "JAVA nadinha, PHP rainha",
      choice3: "Vc disse Netbeans?!",
      choice4: "all of the above (right one)",
      answer: 4
    },
    {
      question:
        "Why is Laravel so much better than JavaWeb?",
      choice1: "Isn't it obvious? (right one)",
      choice2: "Laravel is a Java Wrecker",
      choice3: "Dude, just get over it'",
      choice4: "C'mon UFF, stop using JAVA to teach Dev Web",
      answer: 1
    },
    {
      question: " Give me one good reason to use Java",
      choice1: "It has strong community",
      choice2: "It's a plataform mature enough",
      choice3: "It has good frameworks",
      choice4: "allright, those choices above are correct, but still, me no like Java",
      answer: 4
    }
  ];



const maxQuestions =3;

//arrow syntax - Ferrero syntax ASX 
startQuiz = () =>{
    questionCount = 0;
    score = 0;
    // the three dots allows to get a full copy of the array questions. if we just assign, changing one will affect the other
    availebleQuestions = [...questions];    
    getNewQuestion();
}

getNewQuestion = () =>{

    startTimeBar(questionCount);

    if(availebleQuestions.length === 0 || questionCount >= maxQuestions){      
      //scoreFinal.innerText = score;
      console.log(score);
      localStorage.setItem("score",score);
      return window.location.assign('/scorePage.html');    
    }

    questionCount++;
    questionCounterText.innerText = questionCount + "/" + maxQuestions;
    scoreText.innerText = score;

    //gets radom questions out of the set
    var questionIndex = Math.floor(Math.random() * availebleQuestions.length);
    currentQuestion = availebleQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //gets the number of the choice so it can set the choice in the right place
    choices.forEach( choice => {
        var questionNumber = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + questionNumber];      
        addAnimationOfButtons();
    });

    //splice removes elements from array, so used question is not used again
    availebleQuestions.splice(questionIndex,1);    
}

choices.forEach( choice => {
    choice.addEventListener("click",e  =>{
        
       removeAnimationOfButtons();
        var choiceSelected = e.target;
        var chosenAnswer = choiceSelected.dataset["number"];
        var rightOrWrong = chosenAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        score = chosenAnswer == currentQuestion.answer ? score+=10 : score;
        //the line bellow allows javascript to add a class to an element
        choiceSelected.parentElement.classList.add(rightOrWrong);
       
        setTimeout ( ()=>   {
          choiceSelected.parentElement.classList.remove(rightOrWrong);
          getNewQuestion();                   
        },1000);
    });
});



startTimeBar = (questionCount) => {

    width = 100;

    if(timeInterval != null) clearInterval(timeInterval);
    
    timeInterval = setInterval(() => {  

      if (isTimeBarFinished(width)) {          
        removeAnimationOfButtons();        
        clearInterval(timeInterval);  
        setTimeout ( ()=>   {             
        getNewQuestion(); 
        },300);                   
      }
      else {
        updateTimeBarStatus();
      }
    }, 100);
}


removeAnimationOfButtons = () =>{
    console.log("here");
    choices.forEach( choice => {
      var questionNumber = choice.dataset['number'];
      choice.parentElement.classList.remove('choiceContainer'+questionNumber);
  });

} 

addAnimationOfButtons = () =>{  
  choices.forEach( choice => {
    var questionNumber = choice.dataset['number'];
    choice.parentElement.classList.add('choiceContainer'+questionNumber);
});

} 

isTimeBarFinished= (width) => {
  //console.log("width",width);
  if(width <= 0){
    return true;
  }else{
    return false;
  }
}

updateTimeBarStatus = () =>{  
        width--;
        bar.style.width = width + "%";
        seconds.innerHTML = Math.ceil(width/10)+' segundos';       
}

startQuiz();