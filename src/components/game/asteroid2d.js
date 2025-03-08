import { normalizeSpeed } from "./canvas2d.js";
import { createExplosion } from "./explosion2d.js";
import { addAnimation } from "./canvas2d.js";
import { updateScore } from "./score.js";
const TWO_PI = Math.PI * 2;
export const createAsteroid = (ctx, bulletArray, SpaceCraft) => {
  const hitZone = SpaceCraft.hitZone;
  const { width: w, height: h } = ctx.canvas;
  const x = Math.random() * w;
  const y = -20;
  const dirX = Math.random() * (0.6 * w) + 0.2 * w;
  const speed = Math.random() * (h * 0.001) + 1;
  const size = 30 / speed;
  const health = size * 3;
  const { nx, ny } = normalizeSpeed(speed, x, y, dirX, h);
  const points = (Math.random() * 5 + 5) | 0;
  const angleStep = TWO_PI / points;
  const asteroid = [];
  for (let p = 0; p < points; p++) {
    const randSeed = Math.random();
    const angle = p * angleStep + 0.3 * randSeed;
    const radius = size * (0.7 + 0.4 * randSeed);
    asteroid.push({ angle, radius });
  }

  return {
    x,
    y,
    size,
    health,
    dx: nx,
    dy: ny,
    tail: new Array(50).fill(null), // Pre-allocate tail array    asteroid,
    tailIndex: 0,
    asteroid,
    rotation: 0,
    update(ctx) {
      this.rotation += 0.2 / size;
      this.createTail();
      this.drawTail(ctx);
      this.drawAsteroidShape(ctx);
      if (this.y + size > hitZone[0].y) {
        for (let i = 0; i < hitZone.length; i++) {
          const z = hitZone[i];
          if (
            this.y + size > z.y &&
            z.zoneX[0] < this.x &&
            this.x < z.zoneX[1]
          ) {
            SpaceCraft.hp -= this.health;
            addAnimation(
              createExplosion(this.x, this.y + size, size * 2, size * 0.4),
              ctx
            );
            return false;
          }
        }
      }
      // Collision detection with bullets
      for (let i = 0; i < bulletArray.length; i++) {
        const bullet = bulletArray[i];
        const dx = this.x - bullet.x;
        const dy = this.y - bullet.y;
        if (dx * dx + dy * dy < size * size) {
          addAnimation(
            createExplosion(this.x - dx, this.y - dy, size / 2),
            ctx
          );
          bullet.destroyed = true;
          this.dx *= 0.8; // Slow down asteroid
          this.dy *= 0.8;
          bulletArray.splice(i, 1);
          this.health -= bullet.damage;
          if (this.health <= 0) {
            addAnimation(
              createExplosion(this.x, this.y, size * 2, size * 0.4),
              ctx
            );

            updateScore(Math.round(health));
            return false;
          }
        }
      }
      this.x += this.dx;
      this.y += this.dy;

      return !(
        this.x > w + 20 ||
        this.y < -20 ||
        this.x < -20 ||
        this.y > h + 20
      );
    },

    createTail() {
      const angle = Math.random() * TWO_PI;
      const offsetX = Math.cos(angle) * this.size * 0.1;
      const offsetY = Math.sin(angle) * this.size * 0.1;
      this.tail[this.tailIndex] = {
        x: this.x + offsetX,
        y: this.y + offsetY,
        size: this.size,
        opacity: 1,
        life: this.size * 3,
      };

      this.tailIndex = (this.tailIndex + 1) % 50; // Circular buffer
    },

    drawTail(ctx) {
      ctx.beginPath();
      this.tail.forEach((p) => {
        if (!p) return;
        p.size -= p.size * 0.05; // Smooth size reduction
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.size, 0, TWO_PI);
      });
      ctx.fillStyle = `rgba(80, 80, 80,0.8)`;
      ctx.fill();
    },
    drawAsteroidShape(ctx) {
      ctx.beginPath();
      const cosR = Math.cos(this.rotation);
      const sinR = Math.sin(this.rotation);
      this.asteroid.forEach((a, i) => {
        const ax = Math.cos(a.angle) * a.radius;
        const ay = Math.sin(a.angle) * a.radius;

        const rotatedX = ax * cosR - ay * sinR;
        const rotatedY = ax * sinR + ay * cosR;
        const px = this.x + rotatedX;
        const py = this.y + rotatedY;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });

      ctx.closePath();
      ctx.fillStyle = "grey";
      ctx.fill();
    },
  };
};
