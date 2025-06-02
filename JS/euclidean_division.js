
// display game (like in multiplication page)
function showTitle(){ // card title, make click on the logo to test yourself disapears
    var game =document.getElementById("euclidean-titles");
    var title = document.getElementById("game-title");
    if (game.style.display==="block"){
        title.style.display ="none";
    }
    else{
        title.style.display="block"

    }
}
function showGameTitles() { // click on the logo to test yourself

    const titles = document.getElementById("euclidean-titles");
    const logo = document.getElementById("cardlogo");
    logo.classList.remove("spin"); // Reset already spinning
    void logo.offsetWidth; // so when clicked, spin again
    logo.classList.add("spin");
    /* to check in real time the display, to avoid having to click twice
    * on the button for it to activate (x.style.display ===none will fail the first time)*/
    const currentDisplay = window.getComputedStyle(titles).display;

    if (currentDisplay === "none") {
        titles.style.display = "block";
        showTitle()
        titles.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } else {
        titles.style.display = "none";

        showTitle()
    }
}
function showGame(){ // display cards and make the nb of questions disappear or reappears
    const card = document.getElementById("euclidean-quiz");
    const title = document.getElementById("euclidean-titles") // how many questions....
    if (title.style.display ==="block") {
        card.style.display = "block";
        title.style.display = "none";
    }
    else{
        title.style.display="block";
    }
}


//Quiz load


let a, b, expectedQ, expectedR;
let currentProblem = 0;
let score = 0;
let totalProblems = 20; //nb questions

function startQuiz(){
    totalProblems = parseInt(document.getElementById("questionCount").value,10) || 20; // if not valid, value = 20
    showGame();
    generateProblem();
}

function restartQuiz() {

        currentProblem = 0;
        score = 0;
        document.querySelector(".card-container").classList.remove("hidden");
        document.getElementById("scoreScreen").classList.add("hidden");

        document.getElementById("euclidean-quiz").style.display = "none";
        showGame();

}


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

    a = Math.floor(Math.random() * 90) + 10; //[10;99]
    b = Math.floor(Math.random() * 9) + 2; //[2;10]

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
    const scoreOutOf20 = Math.round((score / totalProblems) * 20);
    document.getElementById("finalScore").textContent = `${score}/${totalProblems} <=> ${scoreOutOf20}/20`;

    if (scoreOutOf20 < 10) {
        alert("You should go back to the demonstration!");
    } else if (scoreOutOf20 < 15) {
        alert("Very good but not perfect.");
    } else {
        alert("You are ready for your test!");
    }
}




