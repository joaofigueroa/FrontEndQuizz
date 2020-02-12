const question = document.getElementById('question');
const choices =  Array.from(document.getElementsByClassName('choiceText'));

const questionCounterText = document.getElementById('QuestionCounter');
const scoreText = document.getElementById('Score');



let currentQuestion  = [];
let score  = 0;
let questionCount = 0;
let availebleQuestions = [];

let bar =  [];
let id = [];




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

const points = 1;

const maxQuestions =3;

//arrow syntax - Ferrero syntax ASX 
startquiz = () =>{
    questionCount = 0;
    score = 0;
    // the three dots allows to get a full copy of the array questions. if we just assign, changing one will affect the other
    availebleQuestions = [...questions];
    //console.log(availebleQuestions);
  
    getNewQuestion();
}

getNewQuestion = () =>{

    move(questionCount);

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

    choices.forEach( choice => {
        var questionNumber = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + questionNumber];
    });

    //splice removes elements from array, so used question is not used again
    availebleQuestions.splice(questionIndex,1);    
}

choices.forEach( choice => {
    choice.addEventListener("click",e  =>{
        
     
        var choiceSelected = e.target;
        var chosenAnswer = choiceSelected.dataset["number"];
        var rightOrWrong = chosenAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        score = chosenAnswer == currentQuestion.answer ? score+=10 : score;
        console.log(rightOrWrong);
        //the line bellow allows javascript to add a class to an element
        choiceSelected.parentElement.classList.add(rightOrWrong);
        setTimeout ( ()=>   {
          choiceSelected.parentElement.classList.remove(rightOrWrong);
          getNewQuestion();                   
        },500);
    });
});



move = (questionCount) => {

  var i =0;
  if (i == 0) {
    i = 1;

    bar[questionCount] = document.getElementById("Bar");
    var seconds = document.getElementById("seconds");
    var width = 100;

    
    id[questionCount] = setInterval(frame, 100);

    function frame() {      
      if (width < 0) {
        clearInterval(id[questionCount]);
        i = 0;
        getNewQuestion();                   
      }
    
      else {

        //clears the interval of the last question
        if(questionCount>0){
          clearInterval(id[questionCount-1]);          
        } 

        width--;
        bar[questionCount].style.width = width + "%";
        seconds.innerHTML = Math.ceil(width/10)+' segundos';
        localStorage.setItem('timer',Math.ceil(width/10));                
      }
    }

  }
}




startquiz();