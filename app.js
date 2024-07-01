let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-gameBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerTurnDisplay = document.querySelector("#player-turn");
let scoreO = 0;
let scoreX = 0;
let scoreDisplayO = document.querySelector("#score-o");
let scoreDisplayX = document.querySelector("#score-x");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  playerTurnDisplay.innerText = "Turn: O";
  enableBoxes();
  msgContainer.classList.add("hide");
};

const updateScores = () => {
  scoreDisplayO.innerText = `O: ${scoreO}`;
  scoreDisplayX.innerText = `X: ${scoreX}`;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return; // Prevent clicking on filled boxes

    if (turnO) {
      box.innerText = "O";
      turnO = false;
      playerTurnDisplay.innerText = "Turn: X";
    } else {
      box.innerText = "X";
      turnO = true;
      playerTurnDisplay.innerText = "Turn: O";
    }
    box.disabled = true;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winning-line");
  }
};

const highlightWinningLine = (pattern) => {
  pattern.forEach((index) => {
    boxes[index].classList.add("winning-line");
  });
};

const showWinner = (winner) => {
  if (winner === "O") {
    scoreO++;
  } else {
    scoreX++;
  }
  updateScores();
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        highlightWinningLine(pattern);
        showWinner(pos1Val);
        return;
      }
    }
  }

  // Check for draw
  if ([...boxes].every(box => box.innerText !== "")) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
