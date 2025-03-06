import {
  initCanvas2D,
  resizeCanvas2D,
  getCursorPosition,
  addAnimation,
  stopAnimationLoop,
} from "./canvas2d.js";
import { projectile } from "./projectiles2d.js";
import { createAsteroid } from "./asteroid2d.js";
export const initGame = (parent) => {
  const { canvas, ctx } = initCanvas2D("canvas2D", parent);
  canvas.style.position = "absolute";
  resizeCanvas2D(canvas, ctx);

  const startX = canvas.width / 2;
  const startY = canvas.height;
  const projectiles = [];
  let intervalId;

  const clickHandler = (e) => {
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

  canvas.addEventListener("click", clickHandler);

  intervalId = setInterval(() => {
    addAnimation(createAsteroid(startX, startY, ctx, projectiles), ctx);
  }, 1000);

  // Cleanup function
  return () => {
    canvas.removeEventListener("click", clickHandler);
    clearInterval(intervalId);
    stopAnimationLoop();
  };
};
