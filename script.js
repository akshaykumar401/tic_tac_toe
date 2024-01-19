let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const btnClick = new Audio();
btnClick.src = "./btnSound.mp3";
const boxClick = new Audio();
boxClick.src = "./boxAudio.mp3";
const winnerAudio = new Audio();
winnerAudio.src = "./winner.mp3";


let turnO = true;


// Winning Pattern in 2D Array

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Reset and New Game Button Function

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    onclick = btnClick.play();
};


// Cheacking Turn of X or O

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            onclick = boxClick.play();
            turnO = false;
        } else {
            box.innerText = "X";
            onclick = boxClick.play();
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

// Winner Pop Down Windown Function

const disableBoxes = () => {
    onclick = winnerAudio.play();
    for(let box of boxes) {
        box.disabled = true;
    }
}

// Winner Pop up Window Function

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

// Winner Pop up Window Appling Function

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


// Cheacking Winner

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};


// Applying newGame and reset Game Click Function

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);