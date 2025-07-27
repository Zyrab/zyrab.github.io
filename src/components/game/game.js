import { initGame } from "./game2d.js";
import { initstartTreck } from "./starGL.js";

const cleanupGame = initGame();

const gameElement = document.getElementById("game");

gameElement.addEventListener("click", (e) => {
  e.preventDefault();
  const button = e.target.closest("button");
  if (!button) return;
  const action = button.dataset.btn;
  console.log(action, cleanupGame[action]);
  if (action && typeof cleanupGame[action] === "function") {
    cleanupGame[action]();
  }
});

initstartTreck();
cleanupGame.start();
