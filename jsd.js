const game = document.querySelector("#game");
const dino = document.querySelector("#dino");
const cactus = document.querySelector("#cactus");
const button = document.querySelector("#button");
const score = document.querySelector("#score");
const gameOver = document.querySelector("#game-over");
gameOver.style.display = "none";

const JUMP_DURATION = 600; // ms
const jumpCSSAnimationValue = "jump .5s linear";
const cactusAnimation = "cactusMotion 2s infinite linear";

let isAlive = null;
let gameState = "finish";

button.addEventListener("mousedown", handleButton);

function handleButton() {
  if (gameState === "finish") {
    start();
    button.hidden = true; // hide the button when the game starts
  } else if (gameState === "game") {
    finish();
    button.hidden = false;
  }
}

function start() {
  gameState = "game";
  score.textContent = "00";
  gameOver.style.display = "none";
  cactus.style.animation = cactusAnimation;

  isAlive = setInterval(intervalHandler, 100);
  document.addEventListener("keydown", handleJump);
}

function finish() {
  gameState = "finish";
  gameOver.style.display = "block";
  cactus.style.animation = "none";

  document.removeEventListener("keydown", handleJump);
  clearInterval(isAlive);

  /*alert(Game over, your count: ${ score.textContent });*/

  button.hidden = false; // show the button again when the game finishes
}

function handleJump(event) {
  if (!dino.classList.contains("jump"));
  {
    dino.classList.add("jump");

    setTimeout(() => {
      dino.classList.remove("jump");
      score.textContent = String(+score.textContent + 1);
    }, JUMP_DURATION);
  }
}

function intervalHandler() {
  const dinoY = parseInt(
    window.getComputedStyle(dino).getPropertyValue("bottom")
  );
  const cactusX = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("right")
  );

  if (dinoY < 35 && cactusX >= 400 && cactusX <= 470) {
    finish();
  }
}
