let gameseq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0; // Variable to store the highest score

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) { // if game not started yet
        console.log("game start"); // we are starting it
        started = true;
        levelup();  // function call
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash"); // white color
    }, 400);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () { // green color
        btn.classList.remove("userflash");
    }, 400);
}

function levelup() {
    userSeq = []; // after level up userSeq is reset
    level++;
    h2.innerText = `level ${level}`;

    // random button choose
    let randIdx = Math.floor(Math.random() * 4); // choosing random index from 0 to 3
    let randomBtncol = btns[randIdx]; // choosing the button color
    let randomBtnElement = document.querySelector(`.${randomBtncol}`);
    gameseq.push(randomBtncol); // store the color string instead of the element

    gameflash(randomBtnElement);
    console.log(gameseq);
}

function checkans(idx) {
    if (userSeq[idx] === gameseq[idx]) {
        console.log("correct"); // if sequence is correct
        if (userSeq.length === gameseq.length) {
            setTimeout(levelup, 1000); // calling levelup with timeout
        }
    } else {
        highestScore = 0;
        if (level > highestScore) {
            highestScore = level; // Update highest score
        }
        h2.innerHTML = `game over! your score was <b>${level}</b> <br> Highest score: <b>${highestScore}</b> <br> Press any key to start`; // Display highest score
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn); // button flashing on screen

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkans(userSeq.length - 1); // checking the last button entered by user
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userSeq = [];
    level = 0;
}

