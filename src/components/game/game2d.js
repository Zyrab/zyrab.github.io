import {
  initCanvas2D,
  resizeCanvas2D,
  getCursorPosition,
  addAnimation,
  stopAnimationLoop,
  clearAnimations,
} from "./canvas2d.js";
import { projectile } from "./projectiles2d.js";
import { createAsteroid } from "./asteroid2d.js";
import { Score, resetScore } from "./score.js";

export const initGame = (parent) => {
  const { canvas, ctx } = initCanvas2D("canvas2D", parent);
  canvas.style.position = "absolute";
  resizeCanvas2D(canvas, ctx);
  const startX = canvas.width / 2;
  const startY = canvas.height;
  const projectiles = [];
  let intervalId;
  let isPaused = false;

  addAnimation(Score(), ctx);
  const clickHandler = (e) => {
    if (isPaused) return; // Prevent shooting when paused
    const { x, y } = getCursorPosition(canvas, e);
    const projectileInstance = projectile(
      startX,
      startY,
      x,
      y,
      ctx,
      projectiles
    );
    projectiles.push(projectileInstance);
    addAnimation(projectileInstance, ctx);
  };

  const startAsteroidSpawner = () => {
    intervalId = setInterval(() => {
      addAnimation(createAsteroid(ctx, projectiles), ctx);
    }, 1000);
  };
  return {
    start() {
      canvas.addEventListener("click", clickHandler);
      startAsteroidSpawner();
      addAnimation(Score(), ctx);
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
      this.destroy(); // Stop everything
      // Clear existing projectiles
      projectiles.length = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      isPaused = false;
      this.start(); // Restart the game
    },

    destroy() {
      resetScore();
      canvas.removeEventListener("click", clickHandler);
      clearInterval(intervalId);
      clearAnimations();
      projectiles.length = 0;
    },
  };
};
