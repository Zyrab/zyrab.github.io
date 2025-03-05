import { normalizeSpeed } from "./canvas2d.js";
import { createExplosion } from "./explosion2d.js";
import { addAnimation } from "./canvas2d.js";
export const createAsteroid = (dirX, dirY, ctx, bulletArray) => {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const y = randomY(h);
  const x = randomX(w, y);
  const speed = Math.random() * 2 + 1; // Random speed in range [0.1, 0.6]

  // Normalize speed to move towards the clicked point
  const { nx, ny } = normalizeSpeed(speed, x, y, dirX, dirY);

  return {
    w: w,
    h: h,
    x: x,
    y: y,
    dx: nx,
    dy: ny,
    update(ctx) {
      this.x += this.dx;
      this.y += this.dy;

      // Draw asteroid
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, Math.PI * 2); // Adjust size
      ctx.fillStyle = "gray"; // Asteroid color
      ctx.fill();
      // Collision detection with bullets
      for (let i = 0; i < bulletArray.length; i++) {
        const bullet = bulletArray[i];
        // Check if the distance between the asteroid and bullet is less than their combined radii (collision)
        const distance = Math.sqrt(
          Math.pow(this.x - bullet.x, 2) + Math.pow(this.y - bullet.y, 2)
        );
        if (distance < 20) {
          console.log("Collision detected!");
          // Assuming asteroid radius is 10
          addAnimation(createExplosion(this.x, this.y), ctx); // Trigger explosion at asteroid's location
          bullet.destroyed = true;
          bulletArray.splice(i, 1); // Remove bullet if it hits the asteroid
          return false; // Return false to remove the asteroid
        }
      }
      if (this.x > w + 20 || this.y < -20 || this.x < -20 || this.y > h + 20)
        return false;
      return true;
    },
  };
};

const randomX = (w, h) => {
  const dice = Math.random() * 20;
  if (h < 0) {
    return Math.random() * w;
  } else if (dice < 10) {
    return dice + w;
  } else if (dice > 10) {
    return dice - 20;
  }
};
const randomY = (h) => (Math.random() * h) / 2 - 20;
