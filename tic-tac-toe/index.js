const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "✖";
let isRunning = false;

startGame();

function startGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClicked);
  });
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;

  isRunning = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !isRunning) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  changePlayer();
}

function changePlayer() {
  currentPlayer = currentPlayer == "✖" ? "⭕" : "✖";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];

    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    } else if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      changeCellColor(condition[0], condition[1], condition[2]);

      break;
    } else if (!options.includes("")) {
      statusText.textContent = `Draw!`;
      isRunning = false;
    }
  }

  if (roundWon) {
    changePlayer();
    statusText.textContent = `${currentPlayer} Wins! 🎉`;
    isRunning = false;
  }
}

function restartGame() {
  currentPlayer = "✖";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "inherit";
  });
  isRunning = true;
}

function changeCellColor(...indices) {
  indices.forEach((index) => {
    const selector = `[cellIndex="${index}"]`;
    const colorCell = document.querySelector(selector);

    if (colorCell) {
      colorCell.style.backgroundColor = "limegreen";
    }
  });
}
