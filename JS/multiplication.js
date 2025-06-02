const container = document.getElementById('tables-container');

for (let i = 1; i <= 12; i++) {
    const table = document.createElement('table');
    table.id = `tablemult-${i}`;
    table.className = 'tables-content';

    // Add hidden class to table initially, we know have two classes
    table.classList.add('hidden-table');

    const caption = document.createElement('caption');
    caption.textContent = `Table of ${i}`;
    // Make caption clickable
    caption.style.cursor = 'pointer'; // change cursor into a hand
    caption.addEventListener('click', function() {
        table.classList.toggle('hidden-table');

        table.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    table.appendChild(caption);

    for (let j = 1; j <= 12; j++) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = `${i} × ${j} = ${i * j}`;
        row.appendChild(cell);
        table.appendChild(row);
        row.style.cursor = 'pointer';
        row.addEventListener('click', function()
        {
            table.classList.toggle('hidden-table')

            table.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });


    }
    container.appendChild(table);
}

//Horse part :

function showTitle(){
    var game =document.getElementById("horse-test");
    var title = document.getElementById("game-title");
    if (game.style.display==="block"){
        title.style.display ="none";

    }
    else{
        title.style.display="block"
    }
}
function showGame() {

    const test = document.getElementById("horse-test");
    /* to check in real time the display, to avoid having to click twice
    * on the button for it to activate (x.style.display ===none will fail the first time)*/
    const currentDisplay = window.getComputedStyle(test).display;
    if (currentDisplay === "none") {
        test.style.display = "block";
        test.scrollIntoView({ behavior: 'smooth', block: 'center' });

        showTitle()
    } else {
        test.style.display = "none";
        showTitle()
    }
}

let horse1 = 0;
let horse2 = 0;
let number1 = Math.floor(Math.random() * 11);
let number2 = Math.floor(Math.random() * 11);
let result = number1 * number2;
let running = false
let timer = 3;


let startButton = document.getElementById("StartButton");
let computation = document.getElementById("computation")
let answer = document.getElementById("answer");
let startAgainButton = document.getElementById("StartAgain");
let horseImg1 = document.getElementById("horse1");
let horseImg2 = document.getElementById("horse2");
let textTimer = document.getElementById("textTimer");

let level = 0;

let updateHorse1;
function animateHorse(horse, targetPosition, callback) {
    const startPosition = parseFloat(horse.style.left) || 0; // if a horse style.left is already set, take it else take 0
    const distance = targetPosition - startPosition; // distance we want to parkour
    const duration = 200; // Animation duration in milliseconds
    const startTime = performance.now(); // number of milliseconds since animation started

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); //% of animation done

        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const currentPosition = startPosition + (distance * easeProgress);
        horse.style.left = currentPosition + '%'; // moving the horse

        if (progress < 1) {
            requestAnimationFrame(animate); //to use instead of timeout or interval
        } else if (callback) {
            callback(); // make sure race is over to call win or loose
        }
    }

    requestAnimationFrame(animate);
}


startButton.addEventListener("click", function() {
    // Setup UI
    document.getElementById("setUp").style.display = "none";
    document.getElementById("result").style.display="none";
    startAgainButton.style.display = "none";
    if (level === 0) {
        level = document.getElementById("level").value;
        level = parseInt(level);
    }

    // Show countdown
    let levelnb = document.getElementById("levelnb");
    levelnb.innerHTML =`<h3>Level : ${level}</h3>`;
    levelnb.style.display ="block"
    let countdown = 3;
    textTimer.innerText = countdown;
    textTimer.style.display = "block";

    const countdownInterval = setInterval(() => { // thx lab3
        countdown--;
        textTimer.innerText = countdown;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            textTimer.style.display = "none";

            // Now start the game
            running = true;
            document.getElementById("Q&A").style.display = "block";
            computation.innerHTML = number1.toString() + " &#215 " + number2.toString();
            answer.focus();

            updateHorse1 = setInterval(function () {
                if (level === 1) {
                    horse1 += 1;
                } else if (level === 2) {
                    horse1 += 1.5;
                } else if (level === 3) {
                    horse1 += 3;
                }

                const targetPosition = Math.min(horse1 * 0.9, 95);
                animateHorse(horseImg1, targetPosition, function () {
                    if (horse1 >= 100) {
                        clearInterval(updateHorse1);
                        horse1 = 100;
                        lose();
                    }
                });
            }, 400);
        }
    }, 1000);
});


let button = document.getElementById("submitButton");
button.addEventListener("click", updateHorse2);
answer.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        updateHorse2();
    }
});

function updateHorse2(){
    if(running === true){
        if (parseInt(answer.value) === result){ // to convert answer in int bc result is also int
            horse2+= 8;
            const targetPosition = Math.min(horse2*0.9, 95);
            animateHorse(horseImg2, targetPosition, function() { // call bakc function
                if (horse2 >= 100){
                    clearInterval(updateHorse1);
                    horse2 = 100;
                    win();
                }
            });


        }
        number1 = Math.floor(Math.random() * 11);
        number2 = Math.floor(Math.random() * 11);
        result = number1 * number2;
        computation.innerHTML = number1.toString()+ " &#215 " + number2.toString();

        answer.value = "";
    }
}

function win(){
    clearInterval(updateHorse1);
    running = false;
    var result = document.getElementById("result");

    result.innerHTML ="<h3>You won !</h3>";
    result.style.color ="green";

    result.style.display="block";
    if (level <3){
        startAgainButton.value = "Next level";
        level += 1;
    }
    else{
        startAgainButton.value = "Again";
    }
    startAgainButton.style.display = "block"
}

function lose(){
    running = false;
    document.getElementById("StartAgain").style.display = "block"
    var result = document.getElementById("result");
    result.innerHTML ="<h3>You lost</h3><p>You need to be quicker !</p>";
    result.style.color ="red";

    result.style.display="block";
    startAgainButton.value = "Again";
    startAgainButton.value.onclick ="again";
    startAgainButton.style.display = "block"
}

function again(){
    horse1 = 0;
    horse2 = 0;
    number1 = Math.floor(Math.random() * 11);
    number2 = Math.floor(Math.random() * 11);
    result = number1 * number2;
    horseImg1.style.left = horse1 *0.9 + "%";
    horseImg2.style.left = horse2 *0.9 + "%";
    answer.value="";
    startButton.click()
}
