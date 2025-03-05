import {
  initCanvas2D,
  resizeCanvas2D,
  getCursorPosition,
  addAnimation,
} from "./canvas2d.js";
import { projectile } from "./projectiles2d.js";
import { createAsteroid } from "./asteroid2d.js";

export const initGame = (parent) => {
  const { canvas, ctx } = initCanvas2D("canvas2D", parent);
  canvas.style.position = "absolute";
  resizeCanvas2D(canvas, ctx);

  const startX = canvas.width / 2; // Set starting position
  const startY = canvas.height;
  const projectiles = [];
  canvas.addEventListener("click", (e) => {
    const { x, y } = getCursorPosition(canvas, e);
    const projetile = projectile(startX, startY, x, y, ctx, projectiles);
    projectiles.push(projetile);
    addAnimation(projetile, ctx);
    console.log(projectiles.length);
  });

  setInterval(() => {
    addAnimation(createAsteroid(startX, startY, ctx, projectiles), ctx);
  }, 1000); // Spawns every 3 seconds
};
