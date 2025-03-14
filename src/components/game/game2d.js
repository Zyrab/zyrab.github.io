import {
  initCanvas2D,
  resizeCanvas2D,
  getCursorPosition,
  addAnimation,
  stopAnimationLoop,
  clearAnimations,
} from "./canvas2d.js";
import { projectile } from "./Objects/projectiles.js";
import { asteroid } from "./Objects/asteroid.js";
import { Score, resetScore } from "./score.js";
import { SpaceCraft } from "./Objects/spaceCraft.js";

export const initGame = (parent) => {
  const { canvas, ctx } = initCanvas2D("canvas2D", parent);
  canvas.style.position = "absolute";
  const as = resizeCanvas2D(canvas, ctx);
  const { width: w, height: h } = ctx.canvas;
  let intervalId;
  let isPaused = false;
  const projectiles = [];
  const spaceCraft = SpaceCraft(w, h);

  addAnimation(Score(), ctx);

  const clickHandler = (e) => {
    if (isPaused) return; // Prevent shooting when paused
    const { x, y } = getCursorPosition(canvas, e);
    const projInst = projectile(x, y, w, h, projectiles);
    projectiles.push(projInst);
    addAnimation(projInst, ctx);
    console.log(projectiles.length);
  };
  const startAsteroidSpawner = () => {
    intervalId = setInterval(() => {
      addAnimation(asteroid(w, h, projectiles, spaceCraft), ctx);
    }, 1000);
  };

  return {
    start() {
      startAsteroidSpawner();
      addAnimation(Score(), ctx);
      addAnimation(spaceCraft, ctx);
      canvas.addEventListener("click", clickHandler);
    },

    pause() {
      if (isPaused) return;
      isPaused = true;
      clearInterval(intervalId);
      stopAnimationLoop();
    },

    resume() {
      if (!isPaused) return;
      isPaused = false;
      startAsteroidSpawner();
    },

    restart() {
      this.destroy();
      ctx.clearRect(0, 0, w, h);
      isPaused = false;
      this.start();
    },

    destroy() {
      resetScore();
      canvas.removeEventListener("click", clickHandler);
      clearInterval(intervalId);
      clearAnimations();
    },
  };
};
