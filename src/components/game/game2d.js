import {
  initCanvas2D,
  resizeCanvas2D,
  getCursorPosition,
  addAnimation,
  stopAnimationLoop,
  startAnimationLoop,
  clearAnimations,
} from "./canvas2d.js";
import { projectile } from "./Objects/projectiles.js";
import { Score, resetScore } from "./UI/score.js";
import { spaceCraft } from "./Objects/spaceCraft.js";
import { asteroidSpawner } from "./Objects/asteroidSpawner.js";
import { gameOver } from "./UI/gameOver.js";
export const initGame = (parent) => {
  const { canvas, ctx } = initCanvas2D("canvas2D", parent);
  resizeCanvas2D(canvas);
  canvas.style.position = "absolute";
  const { width: w, height: h } = ctx.canvas;

  let isPaused = false;
  const prjt = [];
  let spCrft;
  let gmOv = gameOver(w, h, restartGame);

  const clickHandler = (e) => {
    e.preventDefault();
    if (isPaused) return; // Prevent shooting when paused
    const { x, y } = getCursorPosition(canvas, e);
    gmOv.checkClick(x, y);
    if (spCrft.destroyed) return;
    const projInst = projectile(x, y, w, h, prjt);
    prjt.push(projInst);
    addAnimation(projInst, ctx);
  };
  function startGame() {
    spCrft = spaceCraft(w, h, gmOv);
    addAnimation(asteroidSpawner(w, h, prjt, spCrft), ctx);
    addAnimation(Score(), ctx);
    addAnimation(spCrft, ctx);
    canvas.addEventListener("click", clickHandler);
  }
  function restartGame() {
    stopAnimationLoop();
    ctx.clearRect(0, 0, w, h);
    resetScore();
    clearAnimations();
    startGame();
  }

  return {
    start: startGame,
    pause() {
      if (isPaused) return;
      isPaused = true;
      stopAnimationLoop();
    },

    resume() {
      if (!isPaused) return;
      isPaused = false;
      startAnimationLoop(ctx);
    },

    restart: restartGame,

    destroy() {
      resetScore();
      canvas.removeEventListener("click", clickHandler);
      clearAnimations();
    },
  };
};
