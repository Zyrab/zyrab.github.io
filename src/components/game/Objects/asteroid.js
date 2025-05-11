import { normalizeSpeed } from "../canvas2d.js";
import { explosion } from "./explosion.js";
import { toPath2D, drawShape } from "@zyrab/parsect-renderer";
import { addAnimation } from "../canvas2d.js";
import { updateScore } from "../UI/score.js";
import { checkCCVCollision, checkCRCollision } from "../collider.js";

const TWO_PI = Math.PI * 2;
export const asteroid = (w, h, prjs, ship) => {
  const x = Math.random() * w;
  const y = -20;
  const dirX = Math.random() * (0.6 * w) + 0.2 * w;
  const speed = Math.random() * (h * 0.001) + 3;
  const size = 10 * speed;
  const scale = (10 + size) / 10;
  const hp = size * 3;
  const { nx, ny } = normalizeSpeed(speed, x, y, dirX, h);
  const shape = Math.round(Math.random() * 4);
  const rotation = Math.random() * TWO_PI;

  return {
    x,
    y,
    hp,
    dx: nx,
    dy: ny,
    rotation,
    size: size,
    update(ctx, dt) {
      this.rotation += 0.3 / size;
      ctx.save();
      ctx.translate(
        this.x - astShp[shape].dims.w / 2,
        this.y - astShp[shape].dims.h / 2
      );
      ctx.rotate(this.rotation);
      ctx.scale(scale, scale);
      drawShape(ctx, astShp[shape].shapes);
      ctx.restore();

      const prj = checkCCVCollision(this, prjs);
      const shp = checkCRCollision(this, ship.hitZone);
      if (shp && !ship.destroyed) {
        ship.destroyed = true;
        addAnimation(explosion(this.x, this.y, size * 2, size * 0.4), ctx);
        return false;
      }
      if (prj) {
        addAnimation(explosion(prj.x, prj.y, size), ctx);
        prj.destroyed = true;
        this.hp -= prj.damage;
        this.dx *= 0.8;
        this.dy *= 0.8;
      }

      if (this.hp <= 0) {
        addAnimation(explosion(this.x, this.y, size * 2, size * 0.2), ctx);
        updateScore(Math.round(hp));
        return false;
      }
      this.x += this.dx * dt;
      this.y += this.dy * dt;

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
      path: "M4,3 A1,1 0 1 0 2,3 A1,1 0 1 0 4,3 Z",
      fill: "#2F2B2B",
    },
    {
      path: "M9,4 A1,1 0 1 0 7,4 A1,1 0 1 0 9,4 Z",
      fill: "#413F3F",
    },
    {
      path: "M6,1.5 A0.5,0.5 0 1 0 5,1.5 A0.5,0.5 0 1 0 6,1.5 Z",
      fill: "#1B1616",
    },
    {
      path: "M6,4.5 A0.5,0.5 0 1 0 5,4.5 A0.5,0.5 0 1 0 6,4.5 Z",
      fill: "#4F4646",
    },
    {
      path: "M4,8.5 A0.5,0.5 0 1 0 3,8.5 A0.5,0.5 0 1 0 4,8.5 Z",
      fill: "#554D4D",
    },
    {
      path: "M6.666667,7.33333 A0.666667,0.666667 0 1 0 5.333333,7.33333 A0.666667,0.666667 0 1 0 6.666667,7.33333 Z",
      fill: "#1C1B1B",
    },
    {
      path: "M3.3333369999999998,6.66667 A0.666667,0.666667 0 1 0 2.000003,6.66667 A0.666667,0.666667 0 1 0 3.3333369999999998,6.66667 Z",
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
      path: "M9.33333,3.33333 A2,2 0 1 0 5.33333,3.33333 A2,2 0 1 0 9.33333,3.33333 Z",
      fill: "#323232",
    },
    {
      path: "M4,5.33333 A1.33333,1.33333 0 1 0 1.33334,5.33333 A1.33333,1.33333 0 1 0 4,5.33333 Z",
      fill: "#323232",
    },
    {
      path: "M6.666667,7.33333 A0.666667,0.666667 0 1 0 5.333333,7.33333 A0.666667,0.666667 0 1 0 6.666667,7.33333 Z",
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
      path: "M9.09092,4.09091 A1.36364,1.36364 0 1 0 6.36364,4.09091 A1.36364,1.36364 0 1 0 9.09092,4.09091 Z",
      fill: "#222222",
    },
    {
      path: "M5.454541,5.45455 A0.909091,0.909091 0 1 0 3.6363589999999997,5.45455 A0.909091,0.909091 0 1 0 5.454541,5.45455 Z",
      fill: "#222222",
    },
    {
      path: "M2.727275,3.18182 A0.454545,0.454545 0 1 0 1.8181850000000002,3.18182 A0.454545,0.454545 0 1 0 2.727275,3.18182 Z",
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
      path: "M7,7 A2,2 0 1 0 3,7 A2,2 0 1 0 7,7 Z",
      fill: "#3D3434",
    },
    {
      path: "M9.32423,2.97576 A1.33333,1.33333 0 1 0 6.65757,2.97576 A1.33333,1.33333 0 1 0 9.32423,2.97576 Z",
      fill: "#222222",
    },
    {
      path: "M3.724243,2.37576 A0.733333,0.733333 0 1 0 2.257577,2.37576 A0.733333,0.733333 0 1 0 3.724243,2.37576 Z",
      fill: "#222222",
    },
    {
      path: "M2.466663,4.73333 A0.733333,0.733333 0 1 0 0.999997,4.73333 A0.733333,0.733333 0 1 0 2.466663,4.73333 Z",
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
      path: "M6,6 A2,2 0 1 0 2,6 A2,2 0 1 0 6,6 Z",
      fill: "#454040",
    },
    {
      path: "M9,3.5 A1,0.5 0 1 0 7,3.5 A1,0.5 0 1 0 9,3.5 Z",
      fill: "#222222",
    },
    {
      path: "M3.724243,2.37575 A0.733333,0.733333 0 1 0 2.257577,2.37575 A0.733333,0.733333 0 1 0 3.724243,2.37575 Z",
      fill: "#978E8E",
    },
    {
      path: "M6.466663,2.73333 A0.733333,0.733333 0 1 0 4.999997,2.73333 A0.733333,0.733333 0 1 0 6.466663,2.73333 Z",
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

const astShp = asteroidsShapes.map((s) => toPath2D(s));
