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
      question: "What is Teddy's favorite toy?",
      choice1: 'rope',
      choice2: 'tenny ball',
      choice3: 'longhorn',
      choice4: 'hedgehog',
      answer: 3     
  },
  {
      question: "Will I ever get my Amazon gift card from DHI?",
      choice1: 'maybe',
      choice2: 'probably not',
      choice3: 'yes',
      choice4: 'noh hue',
      answer: 4     
  },
  {
    question: "Is Teddy the best dog ever?",
    choice1: 'maybe',
    choice2: 'probably not',
    choice3: 'yes',
    choice4: 'noh hue',
    answer: 3     
},
{
  question: "Is dinner ready yet?",
  choice1: 'maybe',
  choice2: 'probably not',
  choice3: 'yes',
  choice4: 'noh hue',
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
      return window.location.assign('/end.html');
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
          return window.location.assign('/end.html');
      }
  }, 1000);
}    

startGame();
