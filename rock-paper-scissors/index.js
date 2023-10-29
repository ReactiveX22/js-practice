const btns = document.querySelectorAll(".playerChoice");
const playerChoiceText = document.querySelector("#playerChoiceText");
const computerChoiceText = document.querySelector("#coumputerChoiceText");
const resultText = document.querySelector("#resultText");

btns.forEach((element) => {
  element.addEventListener("click", () => {
    playerChoice = element.textContent;
    playerChoiceText.textContent = `Player: ${playerChoice}`;

    computerChoice = computerTurn();
    computerChoiceText.textContent = `Computer: ${computerChoice}`;

    resultText.textContent = checkWinner();
  });
});

function computerTurn(params) {
  const randNum = Math.floor(Math.random() * 3 + 1);

  switch (randNum) {
    case 1:
      return "Rock 🤘";

    case 2:
      return "Paper 📃";

    case 3:
      return "Scissors ✂";

    default:
      break;
  }
}

function checkWinner() {
  if (playerChoice == computerChoice) {
    return "Result: Draw";
  } else if (computerChoice == "Rock 🤘") {
    return playerChoice == "Paper 📃" ? "You Win! 🏆" : "You Lose 👎";
  } else if (computerChoice == "Paper 📃") {
    return playerChoice == "Scissors ✂" ? "You Win! 🏆" : "You Lose 👎";
  } else if (computerChoice == "Scissors ✂") {
    return playerChoice == "Rock 🤘" ? "You Win! 🏆" : "You Lose 👎";
  }
}
