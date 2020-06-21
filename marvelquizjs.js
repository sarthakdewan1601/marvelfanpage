// select all elements
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
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does Captain America carry with him into battle",
        imgSrc : "ca.jpg",
        choiceA : "SWORD",
        choiceB : "SHIELD",
        choiceC : "SPEAR",
        correct : "B"
    },{
        question : "Captain America's World War II Sidekick Bucky Barnes later became known as",
        imgSrc : "ws.jpg",
        choiceA : "WAR MACHINE",
        choiceB : "THE WINTER SOLDIER",
        choiceC : "THE FALCON",
        correct : "B"
    },{
        question : "Which Avenger does Thor team up with in Thor: Ragnarok?",
        imgSrc : "tr.jpeg",
        choiceA : "HULK",
        choiceB : "HAWK-EYE",
        choiceC : "IRON-MAN",
        correct : "A"
    },{
        question : "In which film did Black Widow first appear?",
        imgSrc : "bw.jpg",
        choiceA : "AVENGERS: ASSEMBLE",
        choiceB : "THE INCREDIBLE HULK",
        choiceC : "IRON MAN 2",
        correct : "C"
    },{
        question : "In which film did Hawkeye first appear?",
        imgSrc : "he.jpg",
        choiceA : "THOR",
        choiceB : "IRON MAN 3",
        choiceC : "CAPTAIN AMERICA:THE FIRST AVENGER",
        correct : "A"
    },{
        question : "Nick Fury, Dum Dum Dugan and Maria Hill have all be Directors of which fictional Marvel Agency",
        imgSrc : "nf.png",
        choiceA : "A.I.M",
        choiceB : "H.A.M.M.E.R",
        choiceC : "S.H.I.E.L.D",
        correct : "C"
    },{
        question : "What is the Falcon’s real name?",
        imgSrc : "falcon.png",
        choiceA : "SAM WILSON",
        choiceB : "ELIJAH BRADLEY",
        choiceC : "ALEXANDER PIERCE",
        correct : "A"
    },{
        question : "The Scarlet Witches Twin Brother Pietro, Is better known by what name.",
        imgSrc : "sw.webp",
        choiceA : "QUICKSILVER",
        choiceB : "FLASH",
        choiceC : "SPEEDBALL",
        correct : "A"
    },{
        question : "Which Marvel Character famously wields the hammer Mjolnir.",
        imgSrc : "hammer.jpg",
        choiceA : "THOR",
        choiceB : "CAPTAIN AMERICA",
        choiceC : "IRON MAN",
        correct : "A"
       },{
        question : "Ronan the Accuser, Captain Marvel and Korath the Pursuer are all members of what alien race",
        imgSrc : "kree.jpg",
        choiceA : "KREE",
        choiceB : "SKRULL",
        choiceC : "CHITAURI",
        correct : "A"
       }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "5.png" :
              (scorePerCent >= 60) ? "4.png" :
              (scorePerCent >= 40) ? "3.png" :
              (scorePerCent >= 20) ? "2.png" :
              "1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
