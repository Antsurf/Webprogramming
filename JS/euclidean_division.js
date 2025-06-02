// WAIT FOR THE PAGE TO BE FULLY LOADED OR ELSE IT CRASHES
document.addEventListener("DOMContentLoaded", () => {
    let a, b, expectedQ, expectedR;
    let currentProblem = 0;
    let score = 0;
    const totalProblems = 3; //nb questions

    function generateProblem() {
        if (currentProblem >= totalProblems) {
            showScore();
            return;
        }

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

        // if right answer score ++
        const correct = userQ === expectedQ && userR === expectedR;
        if (correct) score++;

        const resultElem = document.getElementById("answer");
        resultElem.innerHTML = `Quotient: <strong>${expectedQ}</strong><br>Remainder: <strong>${expectedR}</strong>`;

        // check if answer correct to change the color to green or red
        resultElem.className = correct ? "correct" : "incorrect";

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
        document.getElementById("finalScore").textContent = score;
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
