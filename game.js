const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const timerText =  document.getElementById('timer');

var sec = 100;

let currentQuestion = {};
let acceptingAnswers = true;
let availableQuestions = [];

let questions = [
    {
      question: 'What is 2 + 2?',
      choice1: '4',
      choice2: '2',
      choice3: '1',
      choice4: '22',
      answer: 1    
  },
  {
      question: "Who was the first U.S. President?",
      choice1: 'Abraham Licoln',
      choice2: 'Thomas Jefferson',
      choice3: 'George Washington',
      choice4: 'Andrew Jackson',
      answer: 3     
  },
  {
      question: "What is the spanish word for the color red?",
      choice1: 'blanco',
      choice2: 'amarillo',
      choice3: 'naranja',
      choice4: 'rojo',
      answer: 4     
  },
  {
    question: "What ocean is on the west coast of the United States?",
    choice1: 'Indian',
    choice2: 'Arctic',
    choice3: 'Pacific',
    choice4: 'Atlantic',
    answer: 3     
},
{
  question: "What is the name for the first 10 ammendments to the US Constitution?",
  choice1: 'Declaration of Independence',
  choice2: 'The 10 Commandments',
  choice3: 'The Miranda Rights',
  choice4: 'The Bill of Rights',
  answer: 4     
}
];


  // constants
  const MAX_QUESTIONS = 5;

    startGame = () => {
      startTimer()

    availableQuestions = [... questions]
    getNewQuestion()

  }

  function getNewQuestion(){
    if(availableQuestions.length == 0){
      return window.location.assign('./end.html?score='+sec);
    }
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply = 
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if(classToApply == "incorrect"){
      timerPenalty();
    }

    selectedChoice.parentElement.classList.add(classToApply);

  setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  }, 1000);
  });
});

function timerPenalty () {
  sec -= 10
  timerText.innerHTML = sec;
 };

function startTimer(){
  console.log('timer started')
  var timer = setInterval(function(){
      sec--;
      timerText.innerHTML = sec;
      if (sec < 0) {
          clearInterval(timer);
          return window.location.assign('./end.html?score='+sec);
      }
  }, 1000);
}    

startGame();


// create variable for current score which is equal to remaining time when quiz is complete
// create variable for name associated with score
// this may look like an object
// save object to local storage using localStorage.setItem
// get highscore data from local storage &
// assign key values to innerText of html elements to display on the highscores page



