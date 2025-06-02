
// display game (like in multiplication page)
function showTitle(){
    var game =document.getElementById("euclidean-quiz");
    var title = document.getElementById("game-title");
    if (game.style.display==="block"){
        title.style.display ="none";
    }
    else{
        title.style.display="block"

    }
}
function showGame() {

    var quiz = document.getElementById("euclidean-quiz");
    const logo = document.getElementById("cardlogo");
    logo.classList.remove("spin"); // Reset already spinning
    void logo.offsetWidth; // so when clicked, spin again
    logo.classList.add("spin");
/* to check in real time the display, to avoid having to click twice
* on the button for it to activate (x.style.display ===none will fail the first time)*/
const currentDisplay = window.getComputedStyle(quiz).display;

if (currentDisplay === "none") {
    quiz.style.display = "block";
    showTitle()
    quiz.scrollIntoView({ behavior: 'smooth', block: 'center' });

} else {
    quiz.style.display = "none";

    showTitle()
}
}



//Quizz load

// WAIT FOR THE PAGE TO BE FULLY LOADED OR ELSE IT CRASHES
document.addEventListener("DOMContentLoaded", () => {
let a, b, expectedQ, expectedR;
let currentProblem = 0;
let score = 0;
const totalProblems = 20; //nb questions

function generateProblem() {
    // if over
    if (currentProblem >= totalProblems) {
        showScore();
        return;
    }

    // If card is already flip (due to previous question)
    document.getElementById("card").classList.remove("flipped");
    document.getElementById("answer").className = "";
    document.getElementById("quotient").value = "";
    document.getElementById("remainder").value = "";

    a = Math.floor(Math.random() * 90) + 10;
    b = Math.floor(Math.random() * 9) + 2;

    expectedQ = Math.floor(a / b);
    expectedR = a % b;

    document.getElementById("problem").textContent =
        `Q${currentProblem + 1}/${totalProblems}: What is ${a} ÷ ${b}?`;
}

function checkAnswer() {

    // get user inputs at ints
    const userQ = parseInt(document.getElementById("quotient").value, 10);
    const userR = parseInt(document.getElementById("remainder").value, 10);

    // check if answer correct to change the color to green or red
    //result elem = flipped card
    const resultElem = document.getElementById("answer");

    // if right answer score ++
    const correct = userQ === expectedQ && userR === expectedR;
    if (correct){
        score++;
        resultElem.className = "correct";
        resultElem.innerHTML = `<h2>Right !</h2>Quotient: <strong>${expectedQ}</strong><br>Remainder: <strong>${expectedR}</strong>`;

    }
    else{
        resultElem.className ="incorrect";
        resultElem.innerHTML = `<h2>Wrong !</h2>Quotient: <strong>${expectedQ}</strong><br>Remainder: <strong>${expectedR}</strong>`;

    }

    // check if answer correct to change the color to green or red


    document.getElementById("card").classList.add("flipped");

    // go to next question after 2.5s
    setTimeout(() => {
        currentProblem++;
        generateProblem();
    }, 2500);
}

function showScore() {
    document.querySelector(".card-container").classList.add("hidden");
    document.getElementById("scoreScreen").classList.remove("hidden");
    document.getElementById("finalScore").textContent = `${score}/${totalProblems}`; // attention : not '' but ``
}

function restartQuiz() {
    currentProblem = 0;
    score = 0;
    document.querySelector(".card-container").classList.remove("hidden");
    document.getElementById("scoreScreen").classList.add("hidden");
    generateProblem();
}

window.checkAnswer = checkAnswer;
window.restartQuiz = restartQuiz;

generateProblem();
});
