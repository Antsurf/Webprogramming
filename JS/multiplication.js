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

let horse1 = 0;
let horse2 = 0;
let number1 = Math.floor(Math.random() * 11);
let number2 = Math.floor(Math.random() * 11);
let result = number1 * number2;
let running = false


let startButton = document.getElementById("StartButton");
let computation = document.getElementById("computation")
let answer = document.getElementById("answer");
let startAgainButton = document.getElementById("StartAgain");
let textHorse1 = document.getElementById("numHorse1");
let textHorse2 = document.getElementById("numHorse2");
let level = 0;

let updateHorse1;


startButton.addEventListener("click", function(){
    textHorse1.innerText = "horse 1: " + horse1;
    textHorse2.innerText = "horse 2: " + horse2;
    computation.innerHTML = number1.toString()+ " &#215 " + number2.toString();
    document.querySelector("body").style.backgroundColor = "white";
    document.getElementById("setUp").style.display = "none";
    startAgainButton.style.display = "none";
    if (level === 0){
        level = document.getElementById("level").value;
        level = parseInt(level);
    }
    console.log(level);
    running = true;
    document.getElementById("Q&A").style.display = "block";
    answer.focus();
    updateHorse1 = setInterval(function(){
        if (level === 1){
            horse1 += 1;
        }
        else if(level === 2){
            horse1 += 1.5
        }
        else if (level === 3){
            horse1 += 3;
        }
        textHorse1.innerText = "horse 1: " + horse1;

        if (horse1>=100){
            clearInterval(updateHorse1);
            horse1 = 100;
            textHorse1.innerText = "horse 1: " + horse1;
            lose()
        }
    }, 400);
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
        if (answer.value == result){
            horse2+= 10;
            textHorse2.innerText = "horse 2: " + horse2;

            if(horse2 >= 100) {
                win();
            }

        }
        number1 = Math.floor(Math.random() * 11);
        number2 = Math.floor(Math.random() * 11);
        result = number1 * number2;
        computation.innerHTML = number1.toString()+ " &#215 " + number2.toString();

        answer.value = "";
    }
}

function win(){
    document.querySelector("body").style.backgroundColor = "#AAFF00";
    clearInterval(updateHorse1);
    running = false;

    if (level <3){
        startAgainButton.value = "next level";
        level += 1;
    }
    else{
        startAgainButton.value = "Again";
    }
    startAgainButton.style.display = "block"
}

function lose(){
    document.querySelector("body").style.backgroundColor = "#EE4B2B";
    running = false;
    document.getElementById("StartAgain").style.display = "block"
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
    startButton.click()
}
