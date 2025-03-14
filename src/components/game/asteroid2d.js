import { normalizeSpeed } from "./canvas2d.js";
import { explosion } from "./explosion.js";
import { addAnimation, cacheShapes, drawShape } from "./canvas2d.js";
import { updateScore } from "./score.js";
import { checkCCVCollision, checkCRCollision } from "./collider.js";

const TWO_PI = Math.PI * 2;
export const createAsteroid = (w, h, prjs, ship) => {
  const x = Math.random() * w;
  const y = -20;
  const dirX = Math.random() * (0.6 * w) + 0.2 * w;
  const speed = Math.random() * (h * 0.001) + 3;
  const size = 10 * speed;
  const scale = (10 + size) / 10;
  const health = size * 3;
  const { nx, ny } = normalizeSpeed(speed, x, y, dirX, h);
  const shape = Math.round(Math.random() * 2);
  const rotation = Math.random() * TWO_PI;

  return {
    x,
    y,
    health,
    dx: nx,
    dy: ny,
    rotation,
    size: size,
    update(ctx) {
      this.rotation += 0.3 / size;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.scale(scale, scale);
      drawShape(ctx, asteroid[shape]);
      ctx.restore();

      const prj = checkCCVCollision(this, prjs);
      const shp = checkCRCollision(this, ship.hitZone);
      if (shp) {
        addAnimation(explosion(this.x, this.y, size * 2, size * 0.4), ctx);
        ship.health -= this.health;
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 15;
        ctx.filter = "blur(10px) grayscale(50%)";
        ctx.rect(0, 0, w, h);
        ctx.stroke();
        ctx.filter = "none";
        ctx.restore();
        return false;
      }
      if (prj) {
        addAnimation(explosion(prj.x, prj.y, size / 2), ctx);
        prj.destroyed = true;
        this.health -= prj.damage;
        this.dx *= 0.8;
        this.dy *= 0.8;
      }

      if (this.health <= 0) {
        addAnimation(explosion(this.x, this.y, size * 2, size * 0.4), ctx);
        updateScore(Math.round(health));
        return false;
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
  };
};

const asteroidsShapes = [
  [
    {
      svg: {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
      },
    },
    {
      path: "M8 0.5L5 0L2 1L0 4V6.66667L2 9.5L6 10L8.5 9L10 6V3L8 0.5Z",
      fill: "#5F5959",
    },
    {
      circle: {
        cx: 3,
        cy: 3,
        r: 1,
      },
      fill: "#2F2B2B",
    },
    {
      circle: {
        cx: 8,
        cy: 4,
        r: 1,
      },
      fill: "#413F3F",
    },
    {
      circle: {
        cx: 5.5,
        cy: 1.5,
        r: 0.5,
      },
      fill: "#1B1616",
    },
    {
      circle: {
        cx: 5.5,
        cy: 4.5,
        r: 0.5,
      },
      fill: "#4F4646",
    },
    {
      circle: {
        cx: 3.5,
        cy: 8.5,
        r: 0.5,
      },
      fill: "#554D4D",
    },
    {
      circle: {
        cx: 6,
        cy: 7.33333,
        r: 0.666667,
      },
      fill: "#1C1B1B",
    },
    {
      circle: {
        cx: 2.66667,
        cy: 6.66667,
        r: 0.666667,
      },
      fill: "#1C1B1B",
    },
  ],
  [
    {
      svg: {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
      },
    },
    {
      path: "M8.66667 0H4L2 2.66667L0 4V6.66667L1.33333 8.66667L3.33333 10H6L9.33333 8L10 6.66667V1.33333L8.66667 0Z",
      fill: "#686868",
    },
    {
      circle: {
        cx: 7.33333,
        cy: 3.33333,
        r: 2,
      },
      fill: "#323232",
    },
    {
      circle: {
        cx: 2.66667,
        cy: 5.33333,
        r: 1.33333,
      },
      fill: "#323232",
    },
    {
      circle: {
        cx: 6,
        cy: 7.33333,
        r: 0.666667,
      },
      fill: "#323232",
    },
  ],
  [
    {
      svg: {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
      },
    },
    {
      path: "M9.09091 1.81818H5.45455H4.54545V3.63636L3.18182 4.54545V6.36364L4.09091 7.72727L5.45455 9.09091H6.81818L8.63636 10L9.54545 8.18182V7.27273L10 6.36364V2.72727L9.09091 1.81818Z",
      fill: "#4F4F4F",
    },
    {
      path: "M3.63636 0H1.81818L0.909091 1.81818L0 2.72727V5L1.36364 5.45455L1.81818 7.72727H4.09091L3.18182 6.36364V4.54545L4.54545 3.63636V1.81818H5.45455L3.63636 0Z",
      fill: "#666666",
    },
    {
      circle: {
        cx: 7.72728,
        cy: 4.09091,
        r: 1.36364,
      },
      fill: "#222222",
    },
    {
      circle: {
        cx: 4.54545,
        cy: 5.45455,
        r: 0.909091,
      },
      fill: "#222222",
    },
    {
      circle: {
        cx: 2.27273,
        cy: 3.18182,
        r: 0.454545,
      },
      fill: "#222222",
    },
    {
      path: "M2.72727 0C2.72727 0.179801 2.78059 0.355565 2.88048 0.505064C2.98037 0.654563 3.12235 0.771084 3.28847 0.839891C3.45458 0.908697 3.63737 0.9267 3.81372 0.891623C3.99006 0.856546 4.15205 0.769963 4.27919 0.642824L3.63636 5.4186e-08L2.72727 0Z",
      fill: "#222222",
    },
  ],
  [
    {
      svg: {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
      },
    },
    {
      path: "M8 0H3L1.59091 2.57576L0 4V7L1 10H5L9 9V8L10 7V1L8 0Z",
      fill: "#585555",
    },
    {
      circle: {
        cx: 5,
        cy: 7,
        r: 2,
      },
      fill: "#3D3434",
    },
    {
      circle: {
        cx: 7.9909,
        cy: 2.97576,
        r: 1.33333,
      },
      fill: "#222222",
    },
    {
      circle: {
        cx: 2.99091,
        cy: 2.37576,
        r: 0.733333,
      },
      fill: "#222222",
    },
    {
      circle: {
        cx: 1.73333,
        cy: 4.73333,
        r: 0.733333,
      },
      fill: "#222222",
    },
  ],
  [
    {
      svg: {
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
      },
    },
    {
      path: "M8 -3.8147e-06H3L0 4L1 10L4 9.5L10 5L8 -3.8147e-06Z",
      fill: "#857A7A",
    },
    {
      circle: {
        cx: 4,
        cy: 6,
        r: 2,
      },
      fill: "#454040",
    },
    {
      ellipse: {
        cx: 8,
        cy: 3.5,
        rx: 1,
        ry: 0.5,
      },
      fill: "#222222",
    },
    {
      circle: {
        cx: 2.99091,
        cy: 2.37575,
        r: 0.733333,
      },
      fill: "#978E8E",
    },
    {
      circle: {
        cx: 5.73333,
        cy: 2.73333,
        r: 0.733333,
      },
      fill: "#978E8E",
    },
    {
      path: "M7.73334 6.2C7.73334 6.60501 7.40501 6.93333 7 6.93333C6.59499 6.93333 6.26667 6.60501 6.26667 6.2C6.26667 5.79499 6.59499 5.46667 7 5.46667C7.40501 5.46667 7.73334 5.79499 7.73334 6.2Z",
      fill: "#222222",
    },
    {
      path: "M6.46667 0.733333C6.46667 1.13834 6.13834 1.46667 5.73333 1.46667C5.32832 1.46667 5 1.13834 5 0.733333C5 0.328325 5.32832 0 5.73333 0C6.13834 0 6.46667 0.328325 6.46667 0.733333Z",
      fill: "#222222",
    },
  ],
];

const asteroid = asteroidsShapes.map((s) => cacheShapes(s));
