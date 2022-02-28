const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("highscore");
const submit = document.getElementById("submit");
const highTable = document.getElementById("highScores");

// create questions
let questions = [
  {
    question: "What does HTML stand for?",
    choiceA: "Hypertext Markup Language",
    choiceB: "Hypertext Makeup Language",
    choiceC: "Hypertext Memoization Language",
    correct: "A"
  }, {
    question: "Where should you place the link to an external CSS file in your HTML code?",
    choiceA: "Inside the body tag",
    choiceB: "Inside the head tag",
    choiceC: "At the bottom of the body tag",
    correct: "B"
  }, {
    question: "What does CSS stand for?",
    choiceA: "Coordinated Style Sheets",
    choiceB: "Classic Style Sheets",
    choiceC: "Cascading Style Sheets",
    correct: "C"
  }, {
    question: "What is a function?",
    choiceA: "An algorithm that repeats itself.",
    choiceB: "A self-contained reusable block of code.",
    choiceC: "An object that contains key value pairs.",
    correct: "B"
  }, {
    question: "What is a method in programming?",
    choiceA: "A strict format of doing things.",
    choiceB: "A way to write a specific program.",
    choiceC: "A function which is a property of an object.",
    correct: "C"
  }
];

// variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 60;
const questionTime = 60; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// ask question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);//1sec
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter
function renderCounter() {
  if (count > -1) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count--;
  }
  else {
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnswer
function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
  } else {
    count -= 10;
    // if answer is wrong
  }
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz
    clearInterval(TIMER);
    scoreRender();
  }
}

function scoreRender() {
  quiz.style.display = "none";
  scoreDiv.style.display = "block";
}
//this ensures that the extraneous buttons are hidden after use
const quizEnd = () => {
  scoreRender()
  clearInterval(TIMER)
  console.log(`End of quiz`);
  document.getElementById('choicesDiv').innerHTML = ``;
  document.getElementById(`choiceDiv`).innerHTML = ``;
  document.getElementById(`initials`).classList.remove(`hidden`)
}

//input initials to save score 
submit.addEventListener(`click`, event => {
  let newScore = {
    time: score,
    initials: document.getElementById(`first_name`).value
  }
  //This portion ensures that the scores and times are saved in local storage. Local storage requires us to use JSON to parse the information into strings easily. 
  if (localStorage.getItem(`scores`)) {
    let scores = [];
    scores = JSON.parse(localStorage.getItem(`scores`))
    scores.push(newScore)
    localStorage.setItem("scores", JSON.stringify(scores));
  } else {
    let scores = [];
    scores.push(newScore)
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  // invoke the function to show the high scores.
  highscoreTable()
})
// function gets items from the local storage so we can display the scores on the website. Used innerHTML to simply display scores from javaScript
function highscoreTable(){
  scoreDiv.style.display = "none";
  let scores = [];
  scores = JSON.parse(localStorage.getItem(`scores`))
  console.log(scores)
  highTable.innerHTML = scores
    .map((score) => `<li>${score.initials} - ${score.time}`)
    .join('');
  }
