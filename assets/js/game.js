const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const timerText =  document.getElementById('timer');

var sec = 100;

let currentQuestion = {};
let acceptingAnswers = true;
let availableQuestions = [];

let questions = [
    {
      question: 'What document declard the American Indepence from Britain?',
      choice1: 'The Treaty of Paris',
      choice2: 'Declaration of Independece',
      choice3: 'The U.S. Constitution',
      choice4: 'The Treaty of Versailles',
      answer: 2    
  },
  {
      question: "Who was the first U.S. President?",
      choice1: 'Richard Nixon          ',
      choice2: 'John F Kennedy         ',
      choice3: 'George Washington      ',
      choice4: 'Woodrow Wilson         ',
      answer: 3     
  },
  {
      question: "Which book was written by Thomas Paine",
      choice1: 'The Creature from Jekyll Island',
      choice2: 'Two Treatises of Government',
      choice3: 'The Fedarilst Papers',
      choice4: 'The Rights of Man',
      answer: 4     
  },
  {
    question: "What treaty marked the end of the American Revolution",
    choice1: 'Declaration of Independece',
    choice2: 'The Treaty of Versailles',
    choice3: 'The Treaty of Paris',
    choice4: 'The Magna Carta',
    answer: 3     
},
{
  question: "What are known as the first 10 ammendments to the US Constitution?",
  choice1: 'Declaration of Independence',
  choice2: 'The 10 Commandments         ',
  choice3: 'The Miranda Rights          ',
  choice4: 'The Bill of Rights          ',
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
      localStorage.setItem("score" , sec);
      return window.location.assign('../pages/end.html');
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
  var timer = setInterval(function(){
      sec--;
      timerText.innerHTML = sec;
      if (sec < 0) {
          clearInterval(timer);
          localStorage.setItem("score" , sec);
          return window.location.assign('../pages/end.html');
      }
  }, 1000);
}    

startGame();

