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

// create questions
let questions = [
  {
    question: "What does HTML stand for?",
    choiceA: "Correct",
    choiceB: "Wrong",
    choiceC: "Wrong",
    correct: "A"
  }, {
    question: "What does CSS stand for?",
    choiceA: "Wrong",
    choiceB: "Correct",
    choiceC: "Wrong",
    correct: "B"
  }, {
    question: "What does JS stand for?",
    choiceA: "Wrong",
    choiceB: "Wrong",
    choiceC: "Correct",
    correct: "C"
  }, {
    question: "What type of language is Javascript?",
    choiceA: "Wrong",
    choiceB: "Correct",
    choiceC: "Wrong",
    correct: "B"
  }, {
    question: "What did Kirby eat for breakfast?",
    choiceA: "Wrong",
    choiceB: "Wrong",
    choiceC: "Correct",
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
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

function scoreRender() {
  quiz.style.display = "none";
  scoreDiv.style.display = "block";
}

const quizEnd = () => {
  scoreRender()
  clearInterval(TIMER)
  console.log(`End of quiz`);
  document.getElementById('choicesDiv').innerHTML = ``;
  document.getElementById(`choiceDiv`).innerHTML = ``;
  document.getElementById(`initials`).classList.remove(`hidden`)
}

//input initials to save score 
document.getElementById('submit').addEventListener(`click`, event => {
  let newScore = {
    time: score,
    initials: document.getElementById(`newScore`).value
  }
  console.log(newScore)
  if (localStorage.getItem(`scores`)) {
    let scores = JSON.parse(localStorage.getItem(`scores`))
    scores.push(newScore)
    localStorage.setItem(`scores`, scores)
  } else {
    let scores = [];
    scores.push(newScore)
    localStorage.setItem(`scores`, JSON.stringify(scores))
  }
  let scores = JSON.parse(localStorage.getItem(`scores`))
  scores.forEach(score => {
    document.getElementById(`scores`).innerHTML += `
    ${scores.initials}
    ${scores.time}
    `
  })
})

