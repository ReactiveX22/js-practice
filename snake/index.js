const gameBoard = document.querySelector("#gameBoard");
const contextCanvas = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "black";

const snakeColor = "black";
const snakeBorder = "white";
const unitSize = 25;
const foodColor = "lightgreen";

let isRunning = false;

let xVelocity = unitSize;
let yVelocity = 0;

let foodX;
let foodY;

let score = 0;

let snake = [
  {
    x: unitSize * 4,
    y: 0,
  },
  {
    x: unitSize * 3,
    y: 0,
  },
  {
    x: unitSize * 2,
    y: 0,
  },
  {
    x: unitSize,
    y: 0,
  },
  {
    x: 0,
    y: 0,
  },
];

window.addEventListener("keydown", changeDir);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  isRunning = true;
  scoreText.textContent = score;

  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (isRunning) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else {
    displayGameOver();
  }
}

function clearBoard() {
  contextCanvas.fillStyle = boardBackground;
  contextCanvas.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
  function randomFood(min, max) {
    randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }

  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameHeight - unitSize);
}

function drawFood() {
  contextCanvas.fillStyle = foodColor;
  contextCanvas.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

  snake.unshift(head);

  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  contextCanvas.fillStyle = snakeColor;
  contextCanvas.strokeStyle = snakeBorder;

  snake.forEach((part) => {
    contextCanvas.fillRect(part.x, part.y, unitSize, unitSize);
    contextCanvas.strokeRect(part.x, part.y, unitSize, unitSize);
  });
}

function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      isRunning = false;
      break;
    case snake[0].x >= gameWidth:
      isRunning = false;
      break;
    case snake[0].y < 0:
      isRunning = false;
      break;
    case snake[0].y >= gameHeight:
      isRunning = false;
      break;
  }

  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      isRunning = false;
    }
  }
}

function displayGameOver() {
  contextCanvas.font = "50px consolas";
  contextCanvas.fillStyle = "white";
  contextCanvas.textAlign = "center";

  contextCanvas.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
}

function changeDir(event) {
  const keyPressed = event.key;

  const UP = "w";
  const DOWN = "s";
  const LEFT = "a";
  const RIGHT = "d";

  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  const goingRight = xVelocity == unitSize;
  const goingLeft = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == LEFT && !goingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed == RIGHT && !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == DOWN && !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}

function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;

  snake = [
    {
      x: unitSize * 4,
      y: 0,
    },
    {
      x: unitSize * 3,
      y: 0,
    },
    {
      x: unitSize * 2,
      y: 0,
    },
    {
      x: unitSize,
      y: 0,
    },
    {
      x: 0,
      y: 0,
    },
  ];
  gameStart();
}
