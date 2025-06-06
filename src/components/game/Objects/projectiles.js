import { normalizeSpeed } from "../canvas2d.js";
import { toPath2D, drawShape } from "@zyrab/parsect-renderer";
export const projectile = (endX, endY, w, h, prjArr) => {
  let x = w / 2;
  let y = h - 100;
  const { nx, ny } = normalizeSpeed(16, x, y, endX, endY);
  const angle = Math.atan2(ny, nx);
  return {
    x,
    y,
    dx: nx,
    dy: ny,
    destroyed: false,
    damage: 55,
    zIndex: -1,
    size: 1,
    update(ctx, dt) {
      ctx.save();
      ctx.translate(this.x - dims.w / 2, this.y - dims.h / 2);
      ctx.rotate(angle);
      ctx.scale(3, 3);
      ctx.shadowColor = "purple";
      ctx.shadowBlur = 20;
      drawShape(ctx, shapes);
      ctx.restore();
      if (this.destroyed) return false;
      this.x += this.dx * dt;
      this.y += this.dy * dt;

      if (this.x > w || this.x < 0 || this.y > h || this.y < 0) {
        prjArr.splice(prjArr.indexOf(this), 1);
        return false;
      }
      return true;
    },
  };
};

const projectileShapes = [
  {
    svg: {
      width: "11",
      height: "3",
      viewBox: "0 0 11 3",
    },
  },
  {
    path: "M0.48041 1.78387C8.33755 0.855937 10.4804 0.392016 10.4804 1.55191C10.4804 2.71182 8.33755 2.47982 0.48041 1.78387Z",
    fill: "#E8EFFA",
  },
];

const { shapes, dims } = toPath2D(projectileShapes);
