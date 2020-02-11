const question = document.getElementById('question');
const choices =  Array.from(document.getElementsByClassName('choiceText'));



let currentQuestion  = [];
let acceptingAnswers  = false;
let score  = 0;
let questionCount = 0;
let availebleQuestions = [];

console.log(choices);

let questions = [
    {
      question: "Why is Java Web so bad?",
      choice1: "Its not made for the web",
      choice2: "JAVA nadinha, PHP rainha",
      choice3: "Vc disse Netbeans?!",
      choice4: "all of the above",
      answer: 1
    },
    {
      question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
    },
    {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
    }
  ];

const points = 1;

const maxQuestions =4;

//arrow syntax - Ferrero syntax ASX 
startquiz = () =>{
    questionCount = 0;
    score = 0;
    // the three dots allows to get a full copy of the array questions. if we just assign, changing one will affect the other
    availebleQuestions = [...questions];
    console.log(availebleQuestions);
    getNewQuestion();
}

getNewQuestion = () =>{
    questionCount++;
    
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
        if(!acceptingAnswers) return;
    });
});




startquiz();